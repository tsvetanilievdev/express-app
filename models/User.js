const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true, minLength: [4, 'Username must be at least 4 characters long!'] },
    hashedPass: { type: String, require: true },
    roles: { type: [String], default: ['user'] }
})

userSchema.path('roles').validate(function (val) {
    const roles = ['user', 'admin']
    return val.some(x => roles.includes(x));
}, `User role must be some of ['user', 'admin']`)
const User = model('user', userSchema);

module.exports = User;