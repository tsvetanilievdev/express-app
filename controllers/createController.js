const { getAllExtras } = require('../services/extrasService.js');
const { create } = require('../services/shoesService.js');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const extras = await getAllExtras();

    res.render('create', {
        extras
    });
})

router.post('/', async (req, res) => {
    try {
        const result = await create(req.body);
        res.redirect('/catalog/' + result._id);
    } catch (errors) {
        res.locals.errors = errors;
        res.locals.shoes = { ...req.body }
        res.render('create');
    }
})


module.exports = router;