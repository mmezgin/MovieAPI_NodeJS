const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/movie--api', { useUnifiedTopology: true });
    mongoose.connection.on('open', () => {
        console.log("Mongo db connection successful !");
    });
    mongoose.connection.on('error', (err) => {
        console.log("MongoDB connection is failed ! ", err);
    });
    mongoose.Promise = global.Promise;
};