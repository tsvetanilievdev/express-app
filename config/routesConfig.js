const homeController = require('../controllers/homeController.js');
const catalogController = require('../controllers/catalogController.js');
const myCatalogController = require('../controllers/myCatalogController.js')
const createController = require('../controllers/createController.js');
const editController = require('../controllers/editController.js');
const deleteController = require('../controllers/deleteController.js');
const extrasController = require('../controllers/extrasController.js');
const authController = require('../controllers/authController.js');
const defaultController = require('../controllers/defaultController.js');
const guard = require('../middlewares/guardsMiddleware.js');


module.exports = (app) => {
    app.use('/', homeController);
    //attach all controllers
    app.use('/catalog', catalogController);
    app.use('/my-catalog', myCatalogController);
    app.use('/create', guard.hasUser(), createController);
    app.use('/edit', guard.hasUser(), editController);
    app.use('/delete', guard.hasUser(), deleteController);
    app.use('/extras', guard.hasRole('admin'), extrasController);
    app.use('/auth', authController);

    //attach default controller LAST
    app.all('*', defaultController);
}