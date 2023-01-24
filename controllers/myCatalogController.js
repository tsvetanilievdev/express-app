const router = require('express').Router();
const { getAll, getById, getMyShoes } = require('../services/shoesService.js');


router.get('/', async (req, res) => {
    const search = req.query.search || '';
    const shoes = await getMyShoes(req.user._id, search)
    res.render('catalog', {
        title: 'Catalog Page',
        shoes,
        search,
        userCatalog: true
    });

});

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    const shoes = await getById(id);
    if (req.user && req.user._id == shoes.ownerId) {
        shoes.isOwner = true;
    }
    shoes.isAdmin = res.locals.isAdmin;
    res.render('details', {
        title: 'Details Page',
        shoes
    });

});

module.exports = router;