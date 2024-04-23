const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { typeDefs, resolvers } = require('./schemas');


const startServer = async () => {
  const app = express();
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  await server.start();
  server.applyMiddleware({ app });
  
  const PORT = process.env.PORT || 3001;
  
  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}`);
  });
};
  
startServer();
  
// const PORT = process.env.PORT || 3001;
// const db = require('./config/connection');  
// const app = express();
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req }) => {
//     // get the user token from the headers
//     const token = req.headers.authorization || '';
//     // return the token in the context
//     return { token };
//   },
// });

// server.applyMiddleware({ app });

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Connect to MongoDB
// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });
