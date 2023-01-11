const router = require('express').Router();

router.get('/', aboutController);

function aboutController(req, res) {
    console.log('ABOUT')
    res.render('about');
};

module.exports = router;