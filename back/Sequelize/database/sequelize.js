const { Sequelize, DataTypes } = require('sequelize');
const { applyTablesRelations } = require('../relations/index');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
    host: 'localhost',
    dialect: 'mysql'
});

// Récupération des models
const modelList = [
    require('../models/User.model'),
    require('../models/Role.model')
];

// Déclaration des models a sequelize
modelList.forEach(model  => model(sequelize, DataTypes));

// Création des relations des models
applyTablesRelations(sequelize.models);

module.exports = sequelize;
