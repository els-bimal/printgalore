const { model, Schema } = require('mongoose');

const ordersSchema = new Schema({
    shipingDetails: {
        first: String,
        last: String,
        company: String,
        country: String,
        address1: String,
        address2: String,
        state: String,
        city: String,
        phone: String,
        zip: String,
        email: String,
        adtional_info: String
    },
    differentShipingDetails: {
        first: String,
        last: String,
        company: String,
        country: String,
        address1: String,
        address2: String,
        state: String,
        city: String,
        phone: String,
        zip: String,
        email: String,
        adtional_info: String
    },
    product: [
        {
            prodId: String,
            prodName:String,
            qty: Number,
            price:Number
        },
    ],
    isDeferentShip:Boolean,
    isUserAgree:Boolean,
    status:Number,
    payMethod:Number,
    dateTime:String,
    total: Number,
    isUserLoged:Boolean,
    userId:String

});

module.exports = model('orders', ordersSchema);