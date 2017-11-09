module.exports = () => {
    const mongoose = require('mongoose');
    const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/waiterApp";
    mongoose.connect(mongoURL, {
        useMongoClient: true
    });

    var db = mongoose.connection;

    mongoose.Promise = global.Promise;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Database connection established!');
    });
}