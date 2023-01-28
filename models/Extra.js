const { Schema, model, Types } = require('mongoose');

const extraSchema = new Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, require: true, default: 0, min: [0.1, 'Price must be greater that 0.1'] },
    shoes: { type: [Types.ObjectId], default: [], ref: 'shoes' }
})

const Extra = model('extra', extraSchema);

module.exports = Extra;