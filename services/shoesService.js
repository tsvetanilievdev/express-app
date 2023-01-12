const fs = require('fs');
const createId = require('../utils/createId.js');

const filepath = './models/data.json'
const data = JSON.parse(fs.readFileSync(filepath));

async function persist() {

    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, JSON.stringify(data, null, 2), (err) => {
            if (err == null) {
                console.log('writin....')
                resolve();
            } else {
                reject();
            }
        })
    })
}

function getAll() {
    return data;
}

function getById(id) {
    return data.find(x => x.id == id);
}

async function create(shoesData) {
    let newShoes = {
        id: createId(),
        brand: shoesData.brand,
        model: shoesData.model,
        price: Number(shoesData.price),
        size: Number(shoesData.size),
        description: shoesData.description,
        image: shoesData.image,
    };

    const missing = Object.entries(newShoes).filter(([k, v]) => !v);
    if (missing.length > 0) {
        const errors = missing.map(k => `The ${k[0]} field is required!`);
        throw errors;
    }
    data.push(newShoes);
    await persist();
    return newShoes;
}
module.exports = {
    getAll,
    getById,
    create
}