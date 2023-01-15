const mongoose = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/shoes-store'

module.exports = async (app) => {

    try {
        await mongoose.connect(connectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (error) {
        console.error('Error in initializing DB');
        console.error(error.message);
        process.exit(1);
    }

}