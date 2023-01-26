const { compareSync } = require('bcrypt');
const { Types: { ObjectId } } = require('mongoose')
const Shoes = require('../models/Shoes.js');
const { parseMissingFields } = require('../utils/parseErrors.js');

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

async function getById(id) {
    const shoes = await Shoes.findById(id)
        .populate('extras', 'name price')
        .lean({ virtuals: true })
        .exec();

    return shoes;
}

async function getAllShoesWithExtra(...extraIds) {
    let extrasToFind = extraIds.map(x => new ObjectId(x))
    return Shoes.find({ extras: { $in: extrasToFind } }).select('brand model').lean().exec();
}

async function create(shoesData, ownerId) {
    const missing = parseMissingFields(shoesData);
    if (missing.length > 0) {
        throw missing;
    }

    let newShoes = await Shoes.create({
        brand: shoesData.brand,
        model: shoesData.model,
        price: Number(shoesData.price),
        size: Number(shoesData.size),
        description: shoesData.description,
        img: shoesData.img,
        extras: shoesData.extras,
        ownerId: ownerId.trim()
    })
    return newShoes;
}

async function editById(id, shoesData) {
    const missing = parseMissingFields(shoesData);
    if (missing.length > 0) {
        throw missing;
    }
    const shoes = await Shoes.findById(id);
    Object.keys(shoesData).forEach(key => shoes[key] = shoesData[key])
    await shoes.save();
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