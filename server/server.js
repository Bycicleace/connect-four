const path = require("path");
const express = require("express");
const { authMiddleware } = require("./utils/auth");
// import ApolloServer
const { ApolloServer } = require("apollo-server-express");

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

// Subscription stuff
const { execute, subscribe } = require('graphql');
const { PubSub } = require('graphql-subscriptions');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { createServer } = require("http");
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/graphql', bodyParser.json());


const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

apolloServer.applyMiddleware({ app });

const pubsub = new PubSub();
const server = createServer(app);

// const startServer = async () => {
//   // create a new Apollo server and pass in our schema data
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: authMiddleware,
//   });

//   // Start the Apollo server
//   await server.start();

//   // integrate our Apollo server with the Express application as middleware
//   server.applyMiddleware({ app });

//   // log where we can go to test our GQL API
//   console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
// };

// Initialize the Apollo server
// startServer();

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// UNCOMMENT FOR LIVE
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

db.once("open", () => {
  server.listen(PORT, () => {
    new SubscriptionServer({
      execute,
      subscribe
    }, {
      server: server,
      path: '/subscriptions'
    })
    console.log(`API server running on port ${PORT}!`);
  });
});
