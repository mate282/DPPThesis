const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : String,
    psw : String

});

module.exports = mongoose.model('User',userSchema);
