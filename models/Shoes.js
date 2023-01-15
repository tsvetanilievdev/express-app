const { Schema, model, Types } = require('mongoose');

const shoesSchema = new Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    size: { type: Number, required: true, min: 30 },
    description: { type: String },
    image: { type: String, required: true },
    players: { type: [Types.ObjectId], default: [], ref: 'player' }
}, { timestamps: true })
const Shoes = model('shoes', shoesSchema);

module.exports = Shoes;