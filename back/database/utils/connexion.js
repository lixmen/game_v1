'use strict';
const Sequelize                 =   require('sequelize');
const process                   =   require('process');
const env                       =   process.env.NODE_ENV || 'development';
const config                    =   require(__dirname + '/../../config/config.js')[env];
const applyTablesRelations      =   require('./apply_relations');
const modelList                 =   require('./model_list');

if (!config) { throw new Error('Aucune configuration pour sequelize'); }
  
const sequelize = new Sequelize(config);

// Déclaration des models a sequelize
modelList.forEach(model  => model(sequelize, Sequelize.DataTypes));

// Création des relations des models
applyTablesRelations(sequelize.models);

module.exports = sequelize;

