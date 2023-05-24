const { models }    = require('../Sequelize/database/sequelize');
const jwt           = require('jsonwebtoken');
require('dotenv').config();

// Création de compte d'un utilisateur
exports.signup = async (req, res, next) => {
    await models.User.create(req.body)
    .then(data => {
        res.status(201).json('Compte crée avec succés.');
    })
    .catch(err => {
        throw new Error(err.message);
    })
};

// Connexion d'un utilisateur
exports.signin = async (req, res, next) => {
    const {email, password} = req.body;

    const user = await models.User.findOne({ where: {email} });

    if (!user) { return res.status(404).json('L\'utilisateur recherché n\'existe pas.') };
    if (!user.checkPassword(password)) { return res.status(400).json('Mot de passe incorrect.') };

    const token = jwt.sign({
        userId: user.id,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 14)
    }, process.env.JWT_PWD);

    res.cookie('jwt', token, {
        httOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000
    });

    res.json(user, 200);
};

// Déconnexion d'un utilisateur
exports.logout = (req, res, next) => {
    res.clearCookie('jwt');
    res.json('logout', 200);
}

// Modification de mot de passe utilisateur
exports.changePassword = async (req, res, next) => {
    try {
        const {password, newPassword} = req.body;

        if (!req.user.checkPassword(password)) { return res.status(400).json('Mot de passe incorrect.') };
    
        await req.user.update({password: newPassword})
        res.json('Mot de passe modifié', 200);
    } 
    catch(err) 
    {
        next(err);
    }
}

// Suppression d'un utilisateur
exports.deleteUser = (req, res, next) => {
    res.json('delete', 200);
}