const { getById, editById } = require('../services/shoesService.js');

const router = require('express').Router();

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const shoes = getById(id);
    res.render('edit', {
        shoes
    });
})

router.post('/:id', async (req, res) => {

    try {
        console.log(req.body)
        const result = await editById(req.params.id, req.body);
        res.redirect('/catalog/' + result.id);
    } catch (errors) {
        res.locals.errors = errors;
        res.locals.shoes = { ...req.body, id: req.params.id }
        res.render('edit');
    }
})


module.exports = router;