const bcrypt = require('bcrypt');
const User = require('../models/User.js');

async function register(username, password) {
    //check if user exisists
    const existing = await User.findOne({ username: username.toLowerCase() }).lean();
    if (existing) {
        throw new Error('The username is taken');
    }
    //hash password
    const hashedPass = await bcrypt.hash(password, 10);
    //create and save user
    const user = await User.create({
        username,
        hashedPass
    })
    return {
        username: user.username,
        roles: user.roles
    }
}
async function login(username, password) {
    //check if user exisists
    const user = await User.findOne({ username: username.toLowerCase() }).lean();
    if (!user) {
        throw new Error('Wrong credentials');
    }
    //check for password
    const match = await bcrypt.compare(password, user.hashedPass);
    console.log(match);
    if (match == false) {
        throw new Error('Wrong credentials');
    }

    return {
        username: user.username,
        roles: user.roles
    }
}

module.exports = {
    login,
    register
}