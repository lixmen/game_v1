const jwt        = require('jsonwebtoken');
const { models } = require('../../Sequelize/database/sequelize');

exports.guard = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(403).json('Vous n\'etes pas autorisé a aller sur cette page.');
    }
}

// Extraction de l'utilisateur du token
exports.extractUserFromToken = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token || token === undefined || token === null) { 
        return next() 
    };

    jwt.verify(token, process.env.JWT_PWD, async (err, decodedToken) => {
        if (err || !decodedToken.userId) { 
           return next() 
        };

        const user = await models.User.findByPk(decodedToken.userId);

        if (user) {
            req.user = user;
            next();
        } else {
            res.clearCookie();
            res.status(403).json('Token d\'authentification invalid.')
        }
    });
}