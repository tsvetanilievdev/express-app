const router = require('express').Router();
const { getAll } = require('../services/shoesService.js');

router.get('/', (req, res) => {
    res.render('catalog', {
        title: 'Catalog Page',
        shoes: getAll()
    });

});

router.get('/:id', (req, res) => {
    res.render('details', {
        title: 'Details Page',
        id: req.params.id
    });

});

module.exports = router;