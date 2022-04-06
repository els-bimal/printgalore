const orders_db = require("../models/orders")
const { ApolloError } = require("apollo-server-errors");


module.exports = {
    Mutation: {
        createOrder: async (parent, args, context, info) => {
            console.log(args);
            const newOrder = new orders_db(
                args
              );
            const res = await newOrder.save();
            //console.log("new"+newOrder)
            return newOrder;
        },
    },
    Query: {
        orderById: async (parent, args, context, info) => {
            //console.log(args)
            const {_id} = args;
            const orders = await orders_db.find(args);
            console.log(orders);
           
            return orders;
          },
    },
};
