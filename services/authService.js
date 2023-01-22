const jwt = require('jsonwebtoken');

async function login(username, password) {

    return new Promise((res, rej) => {
        if (username.toLowerCase() == 'seskobg' && password == '123456') {
            res({
                _id: Math.floor(Math.random() * 999999).toString(16),
                username: 'seskobg',
                role: ['user']
            })
        } else {
            rej('Wrong credentials!')
        }
    })
}

module.exports = {
    login
}