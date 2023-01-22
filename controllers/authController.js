const authController = require('express').Router();
const jwt = require('jsonwebtoken');
const secretCode = 'kmek21nnd331NNK@!KKNSAzxzxz202919210s9xzze2321lkrqkx'

authController.get('/obtain', (req, res) => {

    const data = {
        username: 'seskobg',
        role: ['user']
    }

    //token will be active 5 minutes ----------------------------------60sec * 5
    const token = jwt.sign({ data, exp: Math.floor(Date.now() / 1000) + (60 * 5), }, secretCode);
    res.cookie('token', token);
    res.send('here is your token');
})

authController.get('/login', (req, res) => {

})

authController.get('/register', (req, res) => {

})

authController.post('/login', (req, res) => {

})
authController.post('/register', (req, res) => {

})

module.exports = authController;