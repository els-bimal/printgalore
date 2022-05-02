const orders_db = require("../models/orders")
const { ApolloError } = require("apollo-server-errors");


module.exports = {

    Mutation: {


        createOrder: async (parent, args, context, info) => {
            console.log(`Printing args for createOrder: `, args);
            const newOrder = new orders_db(
                args
            );

            const res = await newOrder.save().catch(err => {
                console.log(`ERROR 001: ${err.data}`)
            });

            console.log(`finished saving order`, res)
            // console.log("returning: ", newOrder)

            // let orders = await orders_db.find()
            // console.log(`all orders: `, orders)

            return res;
        },



    },


    Query: {
        orderById: async (parent, args, context, info) => {
            console.log("getting order by id:")
            console.log(args)
            const { _id } = args;
            const orders = await orders_db.findOne(args).catch(error => {
                console.log(error)
            });



            console.log(orders);

            return orders;
        },

        allOrders: async (parent, args, context, info) => {
            //console.log(args)
            const orders = await orders_db.find();
            console.log(orders);

            return orders;
        },

        getOrdersByUserId: async (parent, args, context, info) => {
            console.log(args)
            const { userId } = args
            console.log("attempting to get orders by userId: " + userId)
            const orders = await orders_db.find({ userId }).sort({ salesOrderId: -1 });
            console.log(`Orders found ${orders.length}`);

            return orders;
        },
    },
};
