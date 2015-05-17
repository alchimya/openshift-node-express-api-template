/**
 * Created by domenicovacchiano on 17/05/15.
 */

//put here your api routing modules
module.exports = function (app) {
    app.use('/', require('./home'));
    app.use('/apimodule1', require('./apimodule1'));
    app.use('/login', require('./apimodule2'));
    /*
    //examples
    app.use('/user/signin', require('./signin'));
    app.use('/customers', require('./customers'));
    app.use('/orders', require('./orders'));
    */
};