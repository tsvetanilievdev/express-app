const jwt = require('jsonwebtoken');

module.exports = (secretCode) => (req, res, next) => {
    const token = req.cookies.token;
    res.locals.hasUser = false;
    res.locals.isAdmin = false;
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
        //hasUser? for NAVigation
        res.locals.hasUser = true;
        res.locals.username = req.user.username.toUpperCase();
        //user isAdmin?
        res.locals.isAdmin = req.user.roles.includes('admin');
    }
    //sign method
    req.signJWT = (data) => jwt.sign(data, secretCode, { expiresIn: '1h' });

    next();
}