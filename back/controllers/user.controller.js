
// Création de compte d'un utilisateur
exports.signin = (req, res, next) => {
    res.json('signin', 200);
};

// Connexion d'un utilisateur
exports.signup = (req, res, next) => {
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