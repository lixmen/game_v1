'use strict';
const { Model } = require('sequelize');
const bcrypt    = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasOne(models.Role, { foreignKey: 'users' })
    }

    // Definir les différentes methodes de class ici
    checkPassword(password) {
      return bcrypt.compareSync(password, this.password);
    };
  }
  
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        let salt = bcrypt.genSaltSync(12);
        let hash = bcrypt.hashSync(value, salt);
        this.setDataValue('password', hash )
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};