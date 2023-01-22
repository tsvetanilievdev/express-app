const { login } = require('../services/authService.js');

const authController = require('express').Router();

authController.get('/login', (req, res) => {
    res.render('login');

})
authController.post('/login', async (req, res) => {
    try {
        let maxAge = 3600;
        const user = await login(req.body.username, req.body.password);
        const token = req.signJWT(user, maxAge);
        res.cookie('token', token, { maxAge });
        res.redirect('/')
    } catch (error) {
        console.log(error.message);
        res.redirect('/auth/login');
    }
})


authController.get('/register', (req, res) => {

})


authController.post('/register', (req, res) => {

})

module.exports = authController;

