const router = require('express').Router();

router.get('/', homeController);

function homeController(req, res) {
    res.render('home');
};

module.exports = router;