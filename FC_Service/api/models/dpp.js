const mongoose = require('mongoose');

const dppSchema = mongoose.Schema({
    _id: String,
    public_link: String,
    private_link: String

});

module.exports = mongoose.model('Dpp',dppSchema);
