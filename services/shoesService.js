const fs = require('fs');

const filepath = './models/data.json'
const data = JSON.parse(fs.readFileSync(filepath));

async function persist() {
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, data, (err) => {
            if (err == null) {
                resolve();
            } else {
                reject();
            }
        })
    })
}

function getAll() {
    return data;
}

function getById(id) {
    return data.find(x => x.id == id);
}

module.exports = {
    getAll,
    getById
}