const { models }            = require('../Sequelize/database/sequelize');
const { createJwtToken, sendJwtCookie }    = require('../middleware/auth/auth');
require('dotenv').config();

/**
 * Création de compte d'un utilisateur
 */
exports.signup = async (req, res, next) => {
    await models.User.create(req.body)
    .then(data => {
        res.status(201).json('Compte crée avec succés.');
    })
    .catch(err => {
        next(err);
    })
};

/**
 * Connexion d'un utilisateur
 */
exports.signin = async (req, res, next) => {
    try 
    {
        const {email, password} = req.body;
    
        const user = await models.User.findOne({ where: {email} });
    
        if (!user) { return res.status(404).json('L\'utilisateur recherché n\'existe pas.') };
        if (!user.checkPassword(password)) { return res.status(400).json('Mot de passe incorrect.') };
    
        const token = createJwtToken(user.id);
        sendJwtCookie(token, res);
    
        res.json(user, 200);
    }
    catch (error)
    {
        next(error);
    }
};

/**
 * Déconnexion d'un utilisateur
 */
exports.logout = (req, res, next) => {
    res.clearCookie('jwt');
    res.json('logout', 200);
}

/**
 * Modification de mot de passe utilisateur
 */
exports.changePassword = async (req, res, next) => {
    try 
    {
        const {password, newPassword} = req.body;
        console.log(req.user, 'ciicii');

        if (!req.user.checkPassword(password)) { return res.status(400).json('Mot de passe incorrect.') };
    
        await req.user.update({password: newPassword})
        res.json('Mot de passe modifié', 200);
    } 
    catch(err) 
    {
        next(err);
    }
}

/**
 * Suppression d'un utilisateur
 */
exports.deleteUser = async (req, res, next) => {
    res.json('delete', 200);
}