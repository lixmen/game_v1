const { check, validationResult } = require('express-validator');

const errorhandler = (req, res, next) => {
    const errors = !validationResult(req).isEmpty() ? validationResult(req).array() : null;
    if (errors !== null) { console.log("ici"); throw new Error(errors)};
    next();
}

exports.signupSanitization = [
        check('username').trim().escape().isLength({min: 3, max: 30}).withMessage('Le nom d\'utilisateur doit faire entre 3 et 30 caractères.'),
        check('email').isEmail().withMessage('L\'email est incorrect.'),
        check('password').trim().escape().isLength({min: 5, max: 20}).withMessage('Le mot de passe doit contenir entre 5 et 20 caractères'),
        errorhandler
] 

exports.signinSanitization = (req, res, next) => {
    check('username').trim().escape().isLength({min: 3, max: 30}).withMessage('Le nom d\'utilisateur doit faire entre 3 et 30 caractères.'),
    check('password').trim().escape().isLength({min: 5, max: 20}).withMessage('Le mot de passe doit contenir entre 5 et 20 caractères'),
    errorhandler
}

exports.changePasswordSanitization = (req, res, next) => {
    check('password').trim().escape().isLength({min: 5, max: 20}).withMessage('Le mot de passe doit contenir entre 5 et 20 caractères'),
    errorhandler
}