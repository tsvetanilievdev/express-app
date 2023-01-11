const express = require('express');

const hbs = require('express-handlebars');
const app = express();
const port = 3000;

hbs.create({
    extname: '.hbs'
})
app.engine('.hbs', hbs.engine());
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));

app.listen(port, () => console.log(`This app is running on port ${port}...`));