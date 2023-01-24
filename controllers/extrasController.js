const { createAnExtra, getAllExtras, deleteExtra } = require('../services/extrasService.js');
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
        name,
        id
    });
})

extraController.post('/:id/delete', async (req, res) => {
    try {
        const id = req.params.id;
        console.log('DELETING....', id);
        await deleteExtra(id);
        res.redirect('/');
    } catch (error) {
        console.log(error.message);
        res.redirect('/extras');
    }
})
module.exports = extraController;