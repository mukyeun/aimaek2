const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 토큰 추출
            token = req.headers.authorization.split(' ')[1];

            // 토큰 검증
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 사용자 정보 가져오기 (비밀번호 제외)
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: '인증되지 않은 토큰입니다' });
        }
    }

    if (!token) {
        res.status(401).json({ message: '토큰이 없습니다' });
    }
};

module.exports = { protect };
