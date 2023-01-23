module.exports = (defaultTitle) => {
    return ((req, res, next) => {
        res.locals.title = defaultTitle;
        next();
    })
}