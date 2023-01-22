const jwt = require('jsonwebtoken');

module.exports = (secretCode) => (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const data = jwt.verify(token, secretCode);
            console.log('VERIFIED DATA >>>>>>>>>>>>>>>>>>>>>>>>');
            req.user = data;
        } catch (error) {
            //clear cookie
            // res.cookie('token', '', { maxAge: 0 });
            res.clearCookie('token');
            return res.redirect('/login')
        }
    }
    //sign method
    req.signJWT = (data, maxAge) => jwt.sign(data, secretCode, { expiresIn: maxAge });

    next();
}