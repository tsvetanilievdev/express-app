const { create } = require('../services/shoesService.js');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('create');
})

router.post('/', async (req, res) => {
    try {
        const result = await create(req.body);
        res.redirect('/catalog/' + result.id);
    } catch (errors) {
        res.locals.errors = errors;
        res.render('create');
    }
})


module.exports = router;