const { check, body, validationResult } = require('express-validator');
const { login, register } = require('../services/authService.js');
const authController = require('express').Router();

authController.get('/login', (req, res) => {
    res.render('login');

})
authController.post('/login',
    body('username', 'Username is empty!')
        .trim()
        .notEmpty()
        .bail()
        .isLength({ min: 5 }).withMessage('The length of username must be at least 5 charachters'),
    body('password')
        .trim()
        .notEmpty().withMessage('Password is empty!'),
    async (req, res) => {
        const { username, password } = req.body;

        try {
            // if (username.trim() == '' || password.trim() == '') {
            //     throw new Error('All fields are required!')
            // }
            const isValid = validationResult(req);

            if (isValid.errors.length > 0) {
                let result = isValid.errors.map(x => x.msg);
                throw result;
            }

            const user = await login(username, password);
            attachToken(req, res, user);
            res.redirect('/');
        } catch (error) {
            if (error.length > 0) {
                res.locals.errors = error;
            } else {
                res.locals.errors = [error.message];
            }
            res.render('login', {
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

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/login');
})

//sign token and attach it
function attachToken(req, res, user) {
    const token = req.signJWT(user);
    res.cookie('token', token, { maxAge: 3600 * 1000 });

}

module.exports = authController;

