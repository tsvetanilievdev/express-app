const router = require('express').Router();
const { getAll, getById } = require('../services/shoesService.js');

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    let shoes = {}
    try {
        shoes = await getById(id);
    } catch (error) {
        //casting error ??????
        console.log(error)
    }
    if (req.user && req.user._id == shoes.ownerId) {
        shoes.isOwner = true;
    }
    shoes.isAdmin = res.locals.isAdmin;
    res.render('details', {
        title: 'Details Page',
        shoes
    });

});

router.get('/', async (req, res) => {
    const search = req.query.search || '';
    const shoes = await getAll(search);
    res.render('catalog', {
        title: 'Catalog Page',
        shoes,
        search
    });

});

module.exports = router;