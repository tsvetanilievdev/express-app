const Extra = require('../models/Extra.js');

async function getAllExtras() {
    return Extra.find({}).lean().exec();
}

async function createAnExtra(name, price) {
    return Extra.create({
        name,
        price
    })
}
module.exports = {
    getAllExtras,
    createAnExtra
}

