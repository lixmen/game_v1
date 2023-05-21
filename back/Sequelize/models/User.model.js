const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
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
    });
};