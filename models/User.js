const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true },
    hashedPass: { type: String, require: true },
    roles: { type: [String], enum: ['user', 'admin'], default: ['user'] }
})

const User = model('user', userSchema);

module.exports = User;