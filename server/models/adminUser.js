const { model, Schema } = require('mongoose');

const userAdminSchema = new Schema({
    username:{
        type: String,
        required: true,
        index: {
            unique: true,
            partialFilterExpression: { username: { $type: 'string' } },
        },
    }, 
    firstName: {
        type: String,
        required: false,
    }, 
    lastName: {
        type: String,
        required: false,
    }, 
    contactNumber: {
        type: String,
        required: false,
    },     
    emailAddress: {
        type: String,
        required: false,
    },
    roleId: {
        type: String,
        required: false,
    }, 
    password:  {
        type: String,
        required: false,
    }, 
    resetPassword:  {
        type: Boolean,
        required: false,
    }, 
    active:  {
        type: Boolean,
        required: false,
    }, 
    homeStore:  {
        type: String,
        required: false,
    }, 
    dateCreated:  {
        type: Date,
        required: false,
    },
    token :  {
        type: String,
        required: false,
    }, 
});

module.exports = model('administarator', userAdminSchema);


