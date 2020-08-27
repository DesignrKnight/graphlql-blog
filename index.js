const express = require('express');

const app = express();

app. use('/',(req,res) => {
    res.send("Welcome to GraphQL server. Use GraphQL endpoint at /graphql")
})

app.listen(5000, () => {
    console.log('now listening for requests on port 5000');
});