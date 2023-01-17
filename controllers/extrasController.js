const { createAnExtra, getAllExtras } = require('../services/extrasService.js');
const { getAllShoesWithExtra } = require('../services/shoesService.js');

const extraController = require('express').Router();

extraController.get('/', async (req, res) => {
    const extras = await getAllExtras();
    res.render('extras', {
        extras
    });
})

extraController.post('/', async (req, res) => {

    await createAnExtra(req.body.name, req.body.price);
    res.redirect('/extras')

})

extraController.get('/:id/:name', async (req, res) => {
    const { id, name } = req.params
    const shoes = await getAllShoesWithExtra(id);
    res.render('extrasDetails', {
        shoes,
        name
    });
})
module.exports = extraController;