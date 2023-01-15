const fs = require('fs');
const createId = require('../utils/createId.js');

const filepath = './models/data.json'
let data = JSON.parse(fs.readFileSync(filepath));

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

function getAll(search) {

    return data
        .filter(x =>
            x.model.toLowerCase().includes(search.toLowerCase())
            || x.brand.toLowerCase().includes(search.toLowerCase())
            || x.description.toLowerCase().includes(search.toLowerCase())
        )

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

async function editById(id, shoesData) {
    const oldShoes = getById(id);
    if (oldShoes) {
        let newShoes = {
            id,
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

        data = data.map(shoes => {
            if (shoes.id == id) {
                return newShoes;
            }
            return shoes
        })
        await persist();
        return newShoes;
    }
}

async function deleteById(id) {
    data = data.filter(shoes => shoes.id != id);
    await persist();
}
module.exports = {
    getAll,
    getById,
    create,
    editById,
    deleteById
}