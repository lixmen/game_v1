const sequelize = require('../utils/connexion');

sequelize.sync()
.then(() => {
    // sequelize.models.User.create({
    //     username: 'test',
    //     email: 'test@email.fr',
    //     password: 'fposfdmdfsm'
    // })
    console.log('Syncho réussi!');
}).catch(err => {
    console.error(err);
})