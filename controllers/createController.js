const router = require('express').Router();

router.get('/', createController);

function createController(req, res) {
    console.log('create')
    res.render('create');
};

module.exports = router;