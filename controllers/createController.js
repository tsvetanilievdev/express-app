const { body, validationResult } = require('express-validator');
const { getAllExtras } = require('../services/extrasService.js');
const { create } = require('../services/shoesService.js');
const { parseErrors, parseExpressValidatorErrors } = require('../utils/parseErrors.js');
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

router.post('/',
    body('brand', 'Brand must contains only english letters or numbers!')
        .trim()
        .isAlphanumeric(),
    body('model', 'Model must contains only english letters or numbers!')
        .trim()
        .isAlphanumeric(),
    body('price', 'Price must be a number!')
        .trim()
        .isNumeric(),
    body('size', 'Size must be a number!')
        .trim()
        .isNumeric(),
    async (req, res) => {
        try {
            const isValid = validationResult(req);
            if (!isValid.isEmpty()) {
                throw parseExpressValidatorErrors(isValid);
            }
            let shoesData = {
                brand: req.body.brand,
                model: req.body.model,
                price: req.body.price,
                size: req.body.size,
                img: req.body.img,
                description: req.body.description,
            }

            shoesData.extras = Object.keys(req.body).filter(k => k.startsWith('box')).map(k => k.slice(4))
            const ownerId = req.user._id;
            const result = await create(shoesData, ownerId);
            res.redirect('/catalog/' + result._id);
        } catch (error) {
            res.locals.errors = parseErrors(error);

            const dataExtras = await getAllExtras();
            const extras = whichBoxIsChecked(req.body, dataExtras);

            res.locals.shoes = { ...req.body }
            res.locals.extras = extras;
            res.render('create');
        }
    })


module.exports = router;