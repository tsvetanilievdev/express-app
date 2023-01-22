const jwt = require('jsonwebtoken');

module.exports = (secretCode) => (req, res, next) => {
    const token = req.cookies.token;
    console.log('TOKEN >>>>>>>>>>>>>>>>>', token)
    if (token) {
        try {
            const data = jwt.verify(token, secretCode);
            console.log('VERIVIED DATA >>>>>>>>>>>>>>>>>>>>>>>>')
            console.log(data)
            req.user = data;
        } catch (error) {
            //clear cookie
            res.cookie('token', '', { maxAge: 0 });
            console.log(error.message);
            console.log('please login');
            return res.redirect('/login')
        }
    }

    next();
}