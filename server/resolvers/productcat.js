const products = require("../models/products");
const { ApolloError } = require("apollo-server-errors");

module.exports = {
  Mutation: {},
  Query: {
    getsProdCat: async (parent, args, context, info) => {
      //const prod = await products.find();

      //random search
      //const prod = await products.aggregate([{$sample: {size: 4}}]);

      /*db.test.aggregate(
        {$group: {_id: {$substr: ['$category', 0, 1]},
         count: {$sum: 1}}}
         )
         */

      let filderdCat = [];
      var lastStr = " ";
      const prod = await products.find().sort({ category: 1 });
      for (var index = 0; index < prod.length; index++) {
        var catStr = prod[index].category;
        var firstr = catStr.charAt(0);
        if (lastStr !== firstr) {
          lastStr = firstr;
          //console.log(prod[index].category);
          //console.log(firstr)
          filderdCat.push(prod[index]);
        }
      }

      //a.push(prod[0])

      /*
      const prod = await products.aggregate([
        {$match: { category: {$regex: /^c/, $options: 'i'} }},
        {$group: { _id: {category:"$category"} }},
        { $limit : 1 }
        ]);
      */

      //console.log(prod);

      return filderdCat.slice(4, 8);
    },
  },
};
