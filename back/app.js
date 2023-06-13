const express                     = require('express');
const createError                 = require('http-errors');
const cookieParser                = require('cookie-parser');
const logger                      = require('morgan');
const path                        = require('path');
const app                         = express();
const router                      = require('./routes');
const sequelize                   = require('./database/utils/connexion.js');
const { extractUserFromToken }    = require('./middleware/auth/auth');


// Setting view engines
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Setting middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Router
app.use(extractUserFromToken);
app.use('/api', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500).json(req.app.get('env') === 'development' ? err.message : 'Une erreur est survenue!');
});

sequelize.authenticate().then(() => {
    console.log('Connection à sequelize réussi.');
}).catch((error) => {
    console.error('Erreur de connection à sequelize.', error);
});


module.exports = app;