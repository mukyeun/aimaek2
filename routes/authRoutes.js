const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerValidator, loginValidator, validate } = require('../middleware/validators');

// 회원가입 - 유효성 검사 미들웨어 추가
router.post('/register', registerValidator, validate, async (req, res) => {
    try {
        const { name, email, password, contact, height, weight, bloodSugar, temperature } = req.body;

        // 이메일 중복 확인
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: '이미 등록된 이메일입니다' });
        }

        // 새 사용자 생성
        const user = await User.create({
            name,
            email,
            password,
            contact,
            height,
            weight,
            bloodSugar,
            temperature
        });

        // 토큰 생성
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류가 발생했습니다' });
    }
});

// 로그인 - 유효성 검사 미들웨어 추가
router.post('/login', loginValidator, validate, async (req, res) => {
    try {
        const { email, password } = req.body;

        // 사용자 찾기
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: '이메일 또는 비밀번호가 일치하지 않습니다' });
        }

        // 비밀번호 확인
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: '이메일 또는 비밀번호가 일치하지 않습니다' });
        }

        // 토큰 생성
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류가 발생했습니다' });
    }
});

module.exports = router;
