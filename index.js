const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');



const app = express();

app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    }));  

app.listen(5000, () => {
    console.log('now listening for requests on port 5000');
});

var articles = [
    { name: 'The History of Node.js', topic: 'Node.js', date: '2020-08-25T00:00:00Z', id:1},
    { name: 'Understanding Docker Concepts', topic: 'Containers', date: '2020-07-23T00:00:00Z', id:2},
    { name: 'Linting in Node.js using ESLint', topic: 'Node.js', date: '2020-08-24T00:00:00Z', id:3},
    { name: 'REST APIs - Introductory guide', topic: 'API', date: '2020-06-26T00:00:00Z', id:4}
]
console.log(articles)