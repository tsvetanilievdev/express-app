const { createAnExtra, getAllExtras } = require('../services/extrasService.js');

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
module.exports = extraController;