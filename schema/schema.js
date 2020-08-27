const graphql = require('graphql');
const _ = require('lodash');


const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLSchema } = graphql;

var articles = [
    { name: 'The History of Node.js', topic: 'Node.js', date: '2020-08-25T00:00:00Z', id:"1"},
    { name: 'Understanding Docker Concepts', topic: 'Containers', date: '2020-07-23T00:00:00Z', id:"2"},
    { name: 'Linting in Node.js using ESLint', topic: 'Node.js', date: '2020-08-24T00:00:00Z', id:"3"},
    { name: 'REST APIs - Introductory guide', topic: 'API', date: '2020-06-26T00:00:00Z', id:"4"}
]
let arr=['Abel', 'Mathew']

console.log(toString(arr));

const ArticleType = new GraphQLObjectType({
    name: 'Article',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        topic: { type: GraphQLString },
        date: { type: GraphQLString },
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        status: {
            type: GraphQLString,
            resolve(parent, args){
                return "Welcome to GraphQL"
            }
        },
        article: {
            type: ArticleType,
            args: {id:{type: GraphQLID}},
            resolve(parent,args){
                return _.find(articles,{'id':args.id})
            }
        },
        articleByTopic: {
            type: new GraphQLList(ArticleType),
            args: {topic:{type: GraphQLString}},
            resolve(parent,args){
                return _.filter(articles,{'topic':args.topic})
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});