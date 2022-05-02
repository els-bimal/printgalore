const mongoose = require("mongoose");
const config = require("config");
const DBURI = config.get('DBURI')
const db_connection = mongoose.createConnection(DBURI)
const model = mongoose.model
const Schema = mongoose.Schema

const autoIncrement = require('mongoose-auto-increment')
autoIncrement.initialize(db_connection);

const ordersSchema = new Schema({
    salesOrderId: {
        type: Number,
        required: true
    },
    billingDetails: {
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
    shippingDetails: {
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
            prodName: String,
            qty: Number,
            price: Number
        },
    ],
    isDeferentShip: Boolean,
    isUserAgree: Boolean,
    status: String,
    payMethod: String,
    dateTime: Date,
    total: Number,
    isUserLoged: Boolean,
    userId: String,
    paymentDetailId: String

});

ordersSchema.plugin(autoIncrement.plugin, {
    model: 'orders',
    field: 'salesOrderId',
    startAt: 100150,
    incrementBy: 1,
    type: Number,
    unique: true,
});

module.exports = orders = db_connection.model('orders', ordersSchema);