const { body, validationResult } = require('express-validator');
const { login, register } = require('../services/authService.js');
const { parseExpressValidatorErrors, parseErrors } = require('../utils/parseErrors.js');
const authController = require('express').Router();

authController.get('/login', (req, res) => {
    res.render('login');

})
authController.post('/login',
    body('username', 'Username must be at least 4 charachters')
        .trim()
        .isLength({ min: 4 }),
    body('password')
        .trim()
        .notEmpty().withMessage('Password field is empty!'),
    async (req, res) => {
        const { username, password } = req.body;

        try {
            const isValid = validationResult(req);
            if (isValid.errors.length > 0) {
                throw parseExpressValidatorErrors(isValid);
            }

            const user = await login(username, password);
            attachToken(req, res, user);
            res.redirect('/');
        } catch (error) {
            res.render('login', {
                username,
                errors: parseErrors(error)
            })
        }
    })


authController.get('/register', (req, res) => {
    res.render('register');
})


authController.post('/register',
    body('username')
        .trim()
        .isLength({ min: 4 }).withMessage('Username must be at least 4 charachters')
        .bail()
        .isAlphanumeric('en-US', { ignore: ' ' }).withMessage('Username must contains only english letters or numbers!'),
    body('password')
        .trim()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 charachters long!'),
    body('repass', 'The passwords must be the same!')
        .trim()
        .custom(function (value, { req }) {
            return value == req.body.password
        })
    ,
    async (req, res) => {
        const { username, password } = req.body;
        try {
            const isValid = validationResult(req);
            if (isValid.errors.length > 0) {
                throw parseExpressValidatorErrors(isValid);
            }

            const user = await register(username, password);
            attachToken(req, res, user);
            res.redirect('/');
        } catch (error) {
            res.render('register', {
                errors: parseErrors(error),
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

