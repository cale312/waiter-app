const mongoose = require('mongoose');

const newWaiterSchema = mongoose.Schema({
    username: String,
    password: String
});

var waiter = mongoose.model('waiters', newWaiterSchema);

module.exports = waiter;