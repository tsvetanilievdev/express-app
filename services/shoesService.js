const { Types: { ObjectId } } = require('mongoose')
const Shoes = require('../models/Shoes.js');

async function getAll(search) {
    if (search) {
        return Shoes.find({ $text: { $search: search } })
            .limit(3)
            .sort({ 'createdAt': -1 })
            .populate('extras', 'price')
            .lean({ virtuals: true })
            .exec();
    }
    return Shoes.find({}).populate('extras', 'price').lean({ virtuals: true }).exec();

}

async function getMyShoes(ownerId, search) {
    if (search) {
        return Shoes.find({ ownerId, $text: { $search: search } })
            .sort({ 'createdAt': -1 })
            .populate('extras', 'price')
            .lean({ virtuals: true })
            .exec();
    }
    return Shoes.find({ ownerId }).populate('extras', 'price').lean({ virtuals: true }).exec();

}

function getById(id) {
    return Shoes.findById(id)
        .populate('extras', 'name price')
        .lean({ virtuals: true })
        .exec();
}

async function getAllShoesWithExtra(...extraIds) {
    let extrasToFind = extraIds.map(x => new ObjectId(x))
    return Shoes.find({ extras: { $in: extrasToFind } }).select('brand model').lean().exec();
}

async function create(shoesData, ownerId) {
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
        extras: shoesData.extras,
        ownerId
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
    deleteById,
    getAllShoesWithExtra,
    getMyShoes
}