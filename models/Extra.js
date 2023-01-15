const { Schema, model, Types } = require('mongoose');

const extraSchema = new Schema({
    name: { type: String, required: true },
    shoes: { type: [Types.ObjectId], default: [], ref: 'shoes' }
})

const Extra = model('extra', extraSchema);

module.exports = extraSchema;