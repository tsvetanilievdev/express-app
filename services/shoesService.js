const Shoes = require('../models/Shoes.js');

async function getAll(search) {

    return Shoes.find({}).lean().exec();

}

function getById(id) {
    return Shoes.findById(id).lean().exec();
}

async function create(shoesData) {
    const missing = Object.entries(shoesData).filter(([k, v]) => !v);
    if (missing.length > 0) {
        const errors = missing.map(k => `The ${k[0]} field is required!`);
        throw errors;
    }

    let newShoes = await Shoes.create({
        brand: shoesData.brand,
        model: shoesData.model,
        price: Number(shoesData.price),
        size: Number(shoesData.size),
        description: shoesData.description,
        image: shoesData.image,
    })
    return newShoes;
}

async function editById(id, shoesData) {
    const missing = Object.entries(shoesData).filter(([k, v]) => !v);
    if (missing.length > 0) {
        const errors = missing.map(k => `The ${k[0]} field is required!`);
        throw errors;
    }
    console.log('SHOE EDIT!')
    const shoes = await Shoes.findByIdAndUpdate(id, shoesData);
    console.log('BEFORE', shoes)
    return shoes;
}

async function deleteById(id) {
    await Shoes.findByIdAndDelete(id);
}
module.exports = {
    getAll,
    getById,
    create,
    editById,
    deleteById
}