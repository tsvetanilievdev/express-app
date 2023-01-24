const { getAllExtras } = require('../services/extrasService.js');
const { getById, editById } = require('../services/shoesService.js');
const whichBoxIsChecked = require('../utils/whichBoxIsChecked.js');

const router = require('express').Router();

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const shoes = await getById(id);
    //check for isOwner
    if ((req.user && req.user._id == shoes.ownerId) || res.locals.isAdmin) {
        shoes.isOwner = true;
        const allExtras = await getAllExtras();
        const extras = whichBoxIsChecked(shoes.extras, allExtras);

        res.render('edit', {
            shoes,
            extras
        });
    } else {
        res.redirect('/catalog');
    }
})

router.post('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let shoesData = {
            brand: req.body.brand,
            model: req.body.model,
            price: req.body.price,
            size: req.body.size,
            image: req.body.image,
            description: req.body.description,
        }
        shoesData.extras = Object.keys(req.body).filter(k => k.startsWith('box')).map(k => k.slice(4))

        await editById(id, shoesData);
        res.redirect('/catalog/' + id);
    } catch (errors) {
        res.locals.errors = errors;
        res.locals.shoes = { ...req.body, _id: id }
        res.render('edit');
    }
})


module.exports = router;