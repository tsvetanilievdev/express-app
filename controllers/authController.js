const { login, register } = require('../services/authService.js');

const authController = require('express').Router();

authController.get('/login', (req, res) => {
    res.render('login');

})
authController.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        if (username.trim() == '' || password.trim() == '') {
            throw new Error('All fields are required!')
        }
        const user = await login(username, password);
        attachToken(req, res, user);
        res.redirect('/');
    } catch (error) {
        res.render('login', {
            errors: [error.message],
            username
        })
    }
})


authController.get('/register', (req, res) => {
    res.render('register');
})


authController.post('/register', async (req, res) => {
    const { username, password, repass } = req.body;
    try {
        if (username.trim() == '' || password.trim() == '') {
            throw new Error('All fields are required!')
        }
        if (password.trim() !== repass.trim()) {
            throw new Error('The passwords must be the same!')
        }

        const user = await register(username, password);
        attachToken(req, res, user);
        res.redirect('/');
    } catch (error) {
        res.render('register', {
            errors: [error.message],
            username
        })
    }
})

//sign token and attach it
function attachToken(req, res, user) {
    const token = req.signJWT(user);
    res.cookie('token', token, { maxAge: 3600 * 1000 });

}

module.exports = authController;

