const jwt = require('jsonwebtoken');

module.exports = (secretCode) => (req, res, next) => {
    const token = req.cookies.token;
    let hasUser = false;
    let isAdmin = false;
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
        hasUser = true;
        isAdmin = req.user.roles.includes('admin');
    }
    //sign method
    req.signJWT = (data) => jwt.sign(data, secretCode, { expiresIn: '1h' });

    //hasUser? for NAVigation
    res.locals.hasUser = hasUser;

    //user isAdmin?
    res.locals.isAdmin = isAdmin;

    next();
}