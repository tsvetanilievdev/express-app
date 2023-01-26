const router = require('express').Router();
const { getAll, getById } = require('../services/shoesService.js');

router.get('/', async (req, res) => {
    const search = req.query.search || '';
    try {
        const shoes = await getAll(search);
        res.render('catalog', {
            title: 'Catalog Page',
            shoes,
            search
        });
    } catch (error) {
        res.render('catalog', {
            title: 'Catalog Page',
            shoes: [],
            search
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const shoes = await getById(id);
        if (shoes != null) {
            if (req.user && req.user._id == shoes?.ownerId) {
                shoes.isOwner = true;
            }
            shoes.isAdmin = res.locals.isAdmin
            res.render('details', {
                title: 'Details Page',
                shoes
            });
        } else {
            throw new Error('Missing record!');
        }
    } catch (error) {
        console.log(error)
        //casting error ?????? CastError: Cast to ObjectId failed for value
        res.redirect('/catalog');
    }
});


module.exports = router;