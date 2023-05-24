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

    checkExpirationToken;

    jwt.verify(token, process.env.JWT_PWD, async (err, decodedToken) => {
        if (err || !decodedToken.userId) { 
            if (err && err.name === 'TokenExpiredError') {
                const validRefresh = refreshToken(err, res);
                if (validRefresh) {

                }
            }
           return next() 
        };
    });
    
            const user = await models.User.findByPk(decodedToken.userId);
    
            if (user) {
                req.user = user;
                next();
            } else {
                res.clearCookie();
                res.status(403).json('Token d\'authentification invalid.')
            }
}

/**
 * Methode pour checker l'expiration d'un token jwt
 * Si le token est perimé depuis moins de 24h, on retourne true sinon false
 */
const refreshToken = (err, res) => {
    const expiredAt   =  err.expiredAt;
    const actualDate  =  Math.floor(Date.now() / 1000);

    if (actualDate > expiredAt && ((actualDate - expiredAt) < 60 * 60 * 24)) {

    }
};

// Vérification de l'expiration du token
const checkExpirationToken = (req, res, next) => {
    const tokenExp = token.exp;                              
    const nowInSec = Math.floor(Date.now() / 1000);      
    console.log(req);
    console.log('IIOJKLJJ');
    next()
    // if (nowInSec <= tokenExp) {                             
    //   return token
    // } else if (nowInSec > tokenExp && ((nowInSec - tokenExp) < 60 * 60 * 24) ) { // Si il est expiré depuis moins de 24h, on refraichit le token
    //   const refreshedToken = createJwtToken({ id: token.sub });
    //   res.cookie('jwt', refreshedToken, {secure: true, maxAge: 900000, httpOnly: true});
    //   return jwt.verify(refreshedToken, secret)
    // } else {                                                                // Sinon on throw l'erreur
    //   throw new Error('token expired');
    // }
  }

/**
 * Methode pour controler la présence d'un utilisateur en BDD depuis l'userId d'un token
 * Puis place le l'utilisateur sur le req pour avoir l'objet user dans la suite des middlewares
 */
const addUserInRequest = (req, res, next) => {

}