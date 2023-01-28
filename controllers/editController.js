const { body, validationResult } = require('express-validator');
const { getAllExtras } = require('../services/extrasService.js');
const { getById, editById } = require('../services/shoesService.js');
const { parseErrors, parseExpressValidatorErrors } = require('../utils/parseErrors.js');
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

router.post('/:id', body('brand', 'Brand must contains only english letters or numbers!')
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
        let id = req.params.id;
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

            await editById(id, shoesData);
            res.redirect('/catalog/' + id);
        } catch (errors) {
            const allExtras = await getAllExtras();
            const checkedExtras = Object.keys(req.body).filter(k => k.startsWith('box')).map(k => k.slice(4)).map(x => { return { _id: x } });
            const extras = whichBoxIsChecked(checkedExtras, allExtras);
            res.render('edit', {
                shoes: { ...req.body, _id: id },
                errors: parseErrors(errors),
                extras
            });
        }
    })


module.exports = router;