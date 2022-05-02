const { model, Schema } = require('mongoose');

const paymentDetailSchema = new Schema({
    orderId: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    success: {
        type: Boolean,
        required: true
    },
    status_message: {
        type: String,
        required: true
    },
    masked_card_number: {
        type: String,
        required: true
    },
    errors: {
        type: Array,
        required: false
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now()
    },
    modified_at: {
        type: Date,
        required: true,
        default: Date.now()
    },

});

module.exports = model('PaymentDetail', paymentDetailSchema);