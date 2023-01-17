const { Types: { ObjectId } } = require('mongoose')
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
        .populate('extras', 'name price')
        .lean({ virtuals: true })
        .exec();
}

async function getAllShoesWithExtra(extraIds) {

    return Shoes.find({ extras: { $in: [ObjectId('63c40ec8cb30ca8a465e0948'), ObjectId('63c469b7f4abe8dbdf9cda07')] } }).select('brand model');
    // return Shoes.find({ extras: ObjectId('63c40ec8cb30ca8a465e0948') })
    // return Shoes.find({ extras: { $elemMatch: { _id: { $in: ["63c469b7f4abe8dbdf9cda07"] } } } });

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
    deleteById,
    getAllShoesWithExtra
}