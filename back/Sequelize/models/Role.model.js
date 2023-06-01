const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {

        // A voir pour définir les associations ici
        static associate(models) { 
            Role.belongsTo(models.User, { foreignKey: 'role_id' });
        };

        // Definir les différentes methodes de class ici
    }

    Role.init({
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        }
    }, {
        sequelize,
        modelName: 'Role'
    });

    return Role;
};