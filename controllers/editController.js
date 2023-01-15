const { getById, editById } = require('../services/shoesService.js');

const router = require('express').Router();

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const shoes = await getById(id);
    res.render('edit', {
        shoes
    });
})

router.post('/:id', async (req, res) => {

    try {
        console.log('BEFORE')
        const result = await editById(req.params.id, req.body);
        console.log('AFTER')
        res.redirect('/catalog/' + result._id);
    } catch (errors) {
        res.locals.errors = errors;
        res.locals.shoes = { ...req.body, _id: req.params.id }
        res.render('edit');
    }
})


module.exports = router;