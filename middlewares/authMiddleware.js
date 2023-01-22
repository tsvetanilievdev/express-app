const jwt = require('jsonwebtoken');

module.exports = (secretCode) => (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const data = jwt.verify(token, secretCode);
            console.log('VERIFIED DATA >>>>>>>>>>>>>>>>>>>>>>>>')
            req.user = data;
        } catch (error) {
            //clear cookie
            res.cookie('token', '', { maxAge: 0 });
            return res.redirect('/login')
        }
    }
    //sign method
    req.signJWT = (data) => jwt.sign(data, secretCode, { expiresIn: '1h' });

    next();
}