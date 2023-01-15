const { Schema, model, Types } = require('mongoose');


const playerSchema = new Schema({
    name: { type: String, required: true },
    club: { type: String, required: true },
    shoes: { type: [Types.ObjectId], default: [], ref: 'shoes' }
});

const Player = model('player', playerSchema);

module.exports = Player;