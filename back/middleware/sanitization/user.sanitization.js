const { check, validationResult } = require('express-validator');

const errorhandler = (req, res, next) => {
    const errors = !validationResult(req).isEmpty() ? validationResult(req).array() : null;
    if (errors !== null) { throw new Error(errors[0].msg) };
    next();
}

exports.signupSanitization = [
        check('username').trim().escape().isLength({min: 3, max: 30}).withMessage('Le nom d\'utilisateur doit faire entre 3 et 30 caractères.'),
        check('email').isEmail().withMessage('L\'email est incorrect.'),
        check('password').trim().escape().isLength({min: 5, max: 20}).withMessage('Le mot de passe doit contenir entre 5 et 20 caractères'),
        errorhandler,
] 

exports.signinSanitization = [
    check('email').trim().escape().isLength({min: 3, max: 30}).withMessage('Le nom d\'utilisateur doit faire entre 3 et 30 caractères.'),
    check('password').trim().escape().isLength({min: 5, max: 20}).withMessage('Le mot de passe doit contenir entre 5 et 20 caractères'),
    errorhandler
]

exports.changePasswordSanitization = [
    check('password').trim().escape().isLength({min: 5, max: 20}).withMessage('Le mot de passe doit contenir entre 5 et 20 caractères'),
    check('newPassword').trim().escape().isLength({min: 5, max: 20}).withMessage('Le nouveau mot de passe doit contenir entre 5 et 20 caractères'),
    errorhandler
]