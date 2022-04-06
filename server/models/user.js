const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    email: String,
    password : String,
    firstName: String,
    lastName: String,
    token:String
});

module.exports = model('user', userSchema);