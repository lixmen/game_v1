const express       = require('express');
const createError   = require('http-errors');
const cookieParser  = require('cookie-parser');
const logger        = require('morgan');
const path          = require('path');
const app           = express();
const router        = require('./routes');
const debug         = require('debug')('back:middlewares');
require('./database/sequelize');

// Setting view engines
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Setting middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

debug('aprés le router');
//Router
app.use(router);

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
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;