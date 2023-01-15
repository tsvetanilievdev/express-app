const { deleteById } = require('../services/shoesService.js');

const router = require('express').Router();

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    await deleteById(id);
    res.redirect('/catalog');
})

module.exports = router;