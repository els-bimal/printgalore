const { model, Schema } = require('mongoose');

const productSchema = new Schema({
    productCode: {
        type: String,
        unique: true,
        index: true,
        required: true,
    },
    category: {
        type: String,
        unique: false,
        index: true,
        required: false,
    },
    prodName: {
        type: String,
        unique: false,
        index: true,
        required: false,
    },


    stock:Number,
    short_description: String,
    prodPrice: Number,
    large_pictures: [{width: Number, height: Number, url:String}],
    pictures:[{width: Number, height: Number, url:String}],
    ratings: Number,
    url: String,
    is_featured: Boolean,
    is_new: Boolean,
    is_top: Boolean,
    reviews: Number,
    color: {
        type: String,
        unique: false,
        index: true,
        required: false,
    },
    size: {
        type: String,
        unique: false,
        index: true,
        required: false,
    },
    brand: {
        type: String,
        unique: false,
        index: true,
        required: false,
    },
    inventorykey: {
        type: String,
        unique: false,
        index: true,
        required: false,
    },

    keywords: {
        type: String,
        unique: false,
        index: true,
        required: false,
    },
    Style: {
        type: String,
        unique: false,
        index: true,
        required: false,
    },
    originStore: {
        type: String,
        unique: false,
        index: true,
        required: false,
    },

});

module.exports = model('products', productSchema);