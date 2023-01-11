const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('catalog', {
        title: 'Catalog Page'
    });

});

router.get('/:id', (req, res) => {
    res.render('details', {
        title: 'Details Page',
        id: req.params.id
    });

});

module.exports = router;