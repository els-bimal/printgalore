const express = require("express");
const http = require("http");
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const mongoose = require("mongoose");
const typeDefs = require("./resolvers/schema/schema");
const resolvers = require("./resolvers/index");
const MONGODB =
  "mongodb+srv://maduUN:maduPW@cluster0.do5rk.mongodb.net/printglore?retryWrites=true&w=majority";


async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  // app.use('/', express.static('src/images'));

  /*
  app.use(function (req, res, next) {
    //const token = req.headers.authorization || "";
    // Try to retrieve a user with the token
    //console.log(token);
    next();
  });
  */

  app.use("/uploads", express.static("src"));
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // get the authorization from the request headers
      // return a context obj with our token. if any!
      const auth = req.headers.authorization || "";
      return {
        auth,
      };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await mongoose.connect(MONGODB, { useNewUrlParser: true });
  await server.start();
  server.applyMiddleware({ app, bodyParserConfig: true });
  await new Promise((resolve) => httpServer.listen({ port: 4001 }, resolve));
  console.log(`Server ready at http://localhost:4001${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
