const { deleteById, getById } = require('../services/shoesService.js');
const { getAllExtras } = require('../services/extrasService.js');
const whichBoxIsChecked = require('../utils/whichBoxIsChecked.js');

const deleteController = require('express').Router();

deleteController.get('/:id', async (req, res) => {
    const id = req.params.id;
    const shoes = await getById(id);

    if ((req.user && req.user._id == shoes.ownerId) || res.locals.isAdmin) {
        shoes.isOwner = true;
        const allExtras = await getAllExtras();
        const extras = whichBoxIsChecked(shoes.extras, allExtras);

        res.render('delete', {
            shoes,
            extras
        });
    } else {
        res.redirect('/catalog');
    }

})
deleteController.post('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await deleteById(id);
        res.redirect('/catalog');
    } catch (error) {
        console.log(error.message);
        res.redirect('/catalog');
    }
})


module.exports = deleteController;