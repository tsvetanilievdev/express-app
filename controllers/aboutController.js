const router = require('express').Router();

router.get('/', aboutController);

function aboutController(req, res) {
    res.render('about');
};

module.exports = router;