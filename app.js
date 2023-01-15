const express = require('express');

const expressConfig = require('./config/expressConfig.js');
const routesConfig = require('./config/routesConfig.js');
const dbConfig = require('./config/dbConfig.js');

const app = express();
const port = 3000;

start()

async function start() {

    await dbConfig(app);
    expressConfig(app);
    routesConfig(app);

    app.listen(port, () => console.log(`This app is running on port ${port}...`));
}