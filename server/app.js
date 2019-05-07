const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// allow cross-origin requests
app.use(cors());

// connect to mlab database

mongoose.connect(
  "mongodb+srv://edgar:edgar@cluster0-jfmrq.mongodb.net/gql-ninja?retryWrites=true",
  { useNewUrlParser: true }
);

mongoose.connection.once("open", () => {
  console.log("connected to database");
});

mongoose.connection.on("error", err => {
  console.log("There was a db connection error: ", err);
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("now listening for request on port 4000");
});
