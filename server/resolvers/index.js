const theamResolvers = require('./them')
const userResolvers = require('./user')
const adminUserResolvers = require('./adminUser')
const adminProductResolvers = require('./adminproduct')
const prodCatResolvers = require('./productcat')
const productResolvers = require("./product")
const orderResolvers = require("./orders")
const paymentResolvers = require("./payment")

module.exports = {
    Query: {
        ...theamResolvers.Query,
        ...userResolvers.Query,
        ...prodCatResolvers.Query,
        ...productResolvers.Query,
        ...orderResolvers.Query,
        ...paymentResolvers.Query,
        ...adminUserResolvers.Query,
        ...adminProductResolvers.Query,        
    },
    Mutation: {
        ...theamResolvers.Mutation,
        ...userResolvers.Mutation,
        ...prodCatResolvers.Mutation,
        ...productResolvers.Mutation,
        ...orderResolvers.Mutation,
        ...adminUserResolvers.Mutation,                
        ...adminProductResolvers.Mutation,
    },
};