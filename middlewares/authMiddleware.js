const jwt = require('jsonwebtoken');

module.exports = (secretCode) => (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const data = jwt.verify(token, secretCode);
            req.user = data;
        } catch (error) {
            //clear cookie
            res.cookie('token', '', { maxAge: 0 });
            // res.clearCookie('token');
            return res.redirect('/login')
        }
    }
    //sign method
    req.signJWT = (data) => jwt.sign(data, secretCode, { expiresIn: '1h' });

    next();
}