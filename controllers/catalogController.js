const router = require('express').Router();
const { getAll, getById } = require('../services/shoesService.js');

router.get('/', (req, res) => {
    res.render('catalog', {
        title: 'Catalog Page',
        shoes: getAll()
    });

});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    const shoes = getById(id);
    res.render('details', {
        title: 'Details Page',
        shoes
    });

});

module.exports = router;