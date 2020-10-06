const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
require('dotenv').config()


const app = express();

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=>{
    console.log("Connected to MongoDB")
})

app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    }));  

app.listen(process.env.PORT || 5000, () => {
    console.log('now listening for requests on port 5000');
});