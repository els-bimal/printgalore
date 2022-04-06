const { model, Schema } = require('mongoose');

const productSchema = new Schema({
   
    category: String,
    prodName: String,
    stock:Number,
    short_description: String,
    prodPrice: Number,
    large_pictures: [{width: Number, height: Number, url:String}],
    pictures:[{width: Number, height: Number, url:String}],
    ratings: Number,
    url:  String,
    is_featured: Boolean,
    is_new: Boolean,
    is_top: Boolean,
    reviews: Number,

});

module.exports = model('products', productSchema);