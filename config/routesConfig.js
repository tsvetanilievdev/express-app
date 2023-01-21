const homeController = require('../controllers/homeController.js');
const aboutController = require('../controllers/aboutController.js');
const catalogController = require('../controllers/catalogController.js');
const createController = require('../controllers/createController.js');
const editController = require('../controllers/editController.js');
const deleteController = require('../controllers/deleteController.js');
const extrasController = require('../controllers/extrasController.js');
const authController = require('../controllers/authController.js');
const defaultController = require('../controllers/defaultController.js');


module.exports = (app) => {
    app.use('/', homeController);
    //attach all controllers
    app.use('/about', aboutController);
    app.use('/catalog', catalogController);
    app.use('/create', createController);
    app.use('/edit', editController);
    app.use('/delete', deleteController);
    app.use('/extras', extrasController);
    app.use('/auth', authController);

    //attach default controller LAST
    app.all('*', defaultController);
}