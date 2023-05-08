const express       = require('express');
const bodyParser    = require('body-parser');
const app           = express();
const path          = require('path');
const port          = 3000;
require('./database/sequelize');

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use((err, req, res, next) => console.error(err));

app.listen(port, () => console.log(`Le serveur est lancé sur le port: ${port} avec l'environement suivant : ${process.env.NODE_ENV} `))
