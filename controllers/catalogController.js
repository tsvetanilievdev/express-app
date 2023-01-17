const router = require('express').Router();
const { getAll, getById, getAllShoesWithExtra } = require('../services/shoesService.js');


router.get('/', async (req, res) => {

    const test = await getAllShoesWithExtra();
    console.log(test);

    const search = req.query.search || '';
    const shoes = await getAll(search);
    res.render('catalog', {
        title: 'Catalog Page',
        shoes,
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