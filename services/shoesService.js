const Shoes = require('../models/Shoes.js');

async function getAll(search) {
    if (search) {
        return Shoes.find({ $text: { $search: search } })
            .limit(3)
            .sort({ 'createdAt': -1 })
            .lean()
            .exec();
    }
    return Shoes.find({}).lean().exec();

}

function getById(id) {
    return Shoes.findById(id)
        .populate('extras', 'name')
        .lean()
        .exec();
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
        extras: shoesData.extras
    })
    return newShoes;
}

async function editById(id, shoesData) {
    const missing = Object.entries(shoesData).filter(([k, v]) => !v);
    if (missing.length > 0) {
        const errors = missing.map(k => `The ${k[0]} field is required!`);
        throw errors;
    }
    const shoes = await Shoes.findByIdAndUpdate(id, shoesData);
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