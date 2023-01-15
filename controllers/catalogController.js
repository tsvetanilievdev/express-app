const router = require('express').Router();
const { getAll, getById } = require('../services/shoesService.js');

router.get('/', async (req, res) => {
    const search = req.query.search || '';
    res.render('catalog', {
        title: 'Catalog Page',
        shoes: await getAll(search),
        search
    });

});

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    const shoes = await getById(id);
    res.render('details', {
        title: 'Details Page',
        shoes
    });

});

module.exports = router;