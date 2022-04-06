const { model, Schema } = require('mongoose');

const productCatSchema = new Schema({
    _id: String,
    catName : String,
    imageUrl : String
});

module.exports = model('prodcats', productCatSchema);