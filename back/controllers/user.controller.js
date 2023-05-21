const { models } = require('../Sequelize/database/sequelize');

// Création de compte d'un utilisateur
exports.signup = async (req, res, next) => {
    await models.User.create(req.body)
    .then(data => {
        res.status(201).json('Compte crée avec succés.');
    })
    .catch(err => {
        throw new Error(err);
    })
};

// Connexion d'un utilisateur
exports.signin = (req, res, next) => {
    res.json('signup', 200);
};

// Déconnexion d'un utilisateur
exports.logout = (req, res, next) => {
    res.json('logout', 200);
}

// Modification de mot de passe utilisateur
exports.changePassword = (req, res, next) => {
    res.json('change password', 200);
}

// Suppression d'un utilisateur
exports.deleteUser = (req, res, next) => {
    res.json('delete', 200);
}