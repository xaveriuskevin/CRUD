module.exports = (app) => {
    const user = require('../controllers/user.js');

    //Components of CRUD

    //CREATE
    app.post('/user', user.create);

    //READ
    app.get('/user', user.findAll);
    app.get('/user/:userId', user.findOneById);
    app.get('/user/account/:accountNumber', user.findOneByAccountNumber);
    app.get('/user/identity/:identityNumber', user.findOneByIdentityNumber);

    //UPDATE
    app.put('/user/:userId', user.update);

    //DELETE
    app.delete('/user/:userId', user.delete);
}