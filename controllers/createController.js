const { getAllExtras } = require('../services/extrasService.js');
const { create } = require('../services/shoesService.js');
const whichBoxIsChecked = require('../utils/whichBoxIsChecked.js');

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const extras = await getAllExtras();
        res.render('create', {
            extras
        });

    } catch (error) {
        res.render('404');
    }
})

router.post('/', async (req, res) => {
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
        const ownerId = req.user._id;
        const result = await create(shoesData, ownerId);
        res.redirect('/catalog/' + result._id);
    } catch (errors) {
        console.log(Object.keys(errors.errors).map(x => errors.errors[x].properties.message))
        // for (const key in errors) {
        //     const element = errors[key];
        //     console.log('KEY', key, '\n', 'ELEMENT', element);
        // }
        res.locals.errors = errors;
        //check for mongoose schema errors
        // if(errors.name == 'ValidationError'){
        // res.locals.errors = [`The ${path}`];
        // }
        const dataExtras = await getAllExtras();
        const extras = whichBoxIsChecked(req.body, dataExtras);

        res.locals.shoes = { ...req.body }
        res.locals.extras = extras
        res.render('create');
    }
})


module.exports = router;