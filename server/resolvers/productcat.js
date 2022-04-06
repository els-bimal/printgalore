const Productcat = require("../models/productcat");
const { ApolloError } = require("apollo-server-errors");

module.exports = {
  Mutation: {

  },
  Query: {
    getsProdCat: async (parent, args, context, info) => {
      const ProdCat = await Productcat.find();
      //console.log(ProdCat);
     
      return ProdCat;
    },

  },
};
