const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars').create({
    extname: '.hbs'
});
//env
const secretCode = 'kmek21nnd331NNK@!KKNSAzxzxz202919210s9xzze2321lkrqkx'

const defaultTitleMiddleware = require('../middlewares/defaultTitleMiddleware.js');
const authMiddleware = require('../middlewares/authMiddleware.js');


module.exports = (app) => {
    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');

    //middlewares
    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
    app.use(cookieParser());
    app.use(authMiddleware(secretCode))
    app.use(defaultTitleMiddleware('Express App'));
}