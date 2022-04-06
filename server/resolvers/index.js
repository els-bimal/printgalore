const theamResolvers = require('./them')
const userResolvers = require('./user')
const prodCatResolvers = require('./productcat')
const productResolvers = require("./product")
const orderResolvers = require("./orders")

module.exports = {
    Query: {
        ...theamResolvers.Query,
        ...userResolvers.Query,
        ...prodCatResolvers.Query,
        ...productResolvers.Query,
        ...orderResolvers.Query,        
    },
    Mutation: {
        ...theamResolvers.Mutation,
        ...userResolvers.Mutation,
        ...prodCatResolvers.Mutation,
        ...productResolvers.Mutation,
        ...orderResolvers.Mutation,                
    },
};