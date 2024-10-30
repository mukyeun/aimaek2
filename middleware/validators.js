const { check, validationResult } = require('express-validator');

// 회원가입 유효성 검사 규칙
const registerValidator = [
    check('name')
        .trim()
        .notEmpty()
        .withMessage('이름을 입력해주세요')
        .isLength({ min: 2 })
        .withMessage('이름은 2글자 이상이어야 합니다'),
    
    check('email')
        .trim()
        .notEmpty()
        .withMessage('이메일을 입력해주세요')
        .isEmail()
        .withMessage('올바른 이메일 형식이 아닙니다'),
    
    check('password')
        .trim()
        .notEmpty()
        .withMessage('비밀번호를 입력해주세요')
        .isLength({ min: 6 })
        .withMessage('비밀번호는 6자 이상이어야 합니다'),
    
    check('contact')
        .trim()
        .notEmpty()
        .withMessage('연락처를 입력해주세요')
        .matches(/^\d{3}-\d{4}-\d{4}$/)
        .withMessage('올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)'),
    
    check('height')
        .isFloat({ min: 0, max: 300 })
        .withMessage('키는 0-300cm 사이여야 합니다'),
    
    check('weight')
        .isFloat({ min: 0, max: 500 })
        .withMessage('체중은 0-500kg 사이여야 합니다'),
    
    check('bloodSugar')
        .isFloat({ min: 0, max: 1000 })
        .withMessage('혈당은 0-1000mg/dL 사이여야 합니다'),
    
    check('temperature')
        .isFloat({ min: 30, max: 45 })
        .withMessage('체온은 30-45°C 사이여야 합니다')
];

// 로그인 유효성 검사 규칙
const loginValidator = [
    check('email')
        .trim()
        .notEmpty()
        .withMessage('이메일을 입력해주세요')
        .isEmail()
        .withMessage('올바른 이메일 형식이 아닙니다'),
    
    check('password')
        .trim()
        .notEmpty()
        .withMessage('비밀번호를 입력해주세요')
];

// 유효성 검사 결과 처리 미들웨어
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            메시지: '입력값이 올바르지 않습니다',
            오류: errors.array() 
        });
    }
    next();
};

module.exports = {
    registerValidator,
    loginValidator,
    validate
};
