const { body, validationResult } = require('express-validator');
const { createAnExtra, getAllExtras, deleteExtra } = require('../services/extrasService.js');
const { getAllShoesWithExtra } = require('../services/shoesService.js');
const { parseExpressValidatorErrors, parseErrors } = require('../utils/parseErrors.js');

const extraController = require('express').Router();

extraController.get('/', async (req, res) => {
    const extras = await getAllExtras();
    res.render('extras', {
        extras
    });
})

extraController.post('/',
    body('name', 'Name must contains only english letters or numbers!')
        .trim()
        .isAlphanumeric(),
    body('price', 'Price must be a number!')
        .trim()
        .isNumeric(),
    async (req, res) => {
        try {
            const isValid = validationResult(req);
            if (!isValid.isEmpty()) {
                throw parseExpressValidatorErrors(isValid);
            }
            await createAnExtra(req.body.name, req.body.price);
            res.redirect('/extras')
        } catch (error) {
            const extras = await getAllExtras();

            res.render('extras', {
                errors: parseErrors(error),
                input: {
                    name: req.body.name,
                    price: req.body.price
                },
                extras
            })
        }

    })

extraController.get('/:id/:name', async (req, res) => {
    const { id, name } = req.params
    const shoes = await getAllShoesWithExtra(id);
    res.render('extrasDetails', {
        shoes,
        name,
        id
    });
})

extraController.post('/:id/delete', async (req, res) => {
    try {
        const id = req.params.id;
        await deleteExtra(id);
        res.redirect('/');
    } catch (error) {
        res.redirect('/extras');
    }
})
module.exports = extraController;