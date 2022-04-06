const products = require("../models/products")
const { ApolloError } = require("apollo-server-errors");

module.exports = {
  Mutation: {

  },
  Query: {
    getsProd: async (parent, args, context, info) => {
      const Products = await products.find();
      //console.log(Products);
     
      return Products;
    },

    prod_by_id: async (parent, args, context, info) => {
      const {_id} = args;
      const Products = await products.find({_id});
      //console.log(Products);
     
      return Products;
    },

  },
};
