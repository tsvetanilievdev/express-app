const express = require('express');

const hbs = require('express-handlebars').create({
    extname: '.hbs'
});
const app = express();
const port = 3000;

const defaultTitle = require('./middlewares/defaultTitle.js');

const homeController = require('./controllers/homeController.js');
const aboutController = require('./controllers/aboutController.js');
const catalogController = require('./controllers/catalogController.js');
const createController = require('./controllers/createController.js');
const editController = require('./controllers/editController.js')
const defaultController = require('./controllers/defaultController.js');

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));
app.use(defaultTitle('Express App'));

app.use('/', homeController);
//attach all controllers
app.use('/about', aboutController);
app.use('/catalog', catalogController);
app.use('/create', createController);
app.use('/edit', editController)

//attach default controller LAST
app.all('*', defaultController);


app.listen(port, () => console.log(`This app is running on port ${port}...`));