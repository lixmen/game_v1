const bcrypt    = require("bcrypt");
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {

        // A voir pour définir les associations ici
        static associate(models) { 
            User.hasOne(models.Role, { foreignKey: 'users_id' });
        };

        // Definir les différentes methodes de class ici
        checkPassword(password) {
            return bcrypt.compareSync(password, this.password);
        };
    }

    User.init({
        username: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                let salt = bcrypt.genSaltSync(12);
                let hash = bcrypt.hashSync(value, salt);
                this.setDataValue('password', hash )
            }
        },
    }, {
        sequelize,
        modelName: 'User'
    });

    return User;
};