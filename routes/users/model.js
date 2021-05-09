const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
}, {
    timestamps: true
});

const UserModel = mongoose.model('User', schema);

module.exports = UserModel;