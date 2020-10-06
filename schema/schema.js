const graphql = require('graphql');
const _ = require('lodash');
const Article = require('../models/article');
const Contributor = require('../models/contributor');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLSchema, GraphQLNonNull } = graphql;

/*
let articles = [
    { name: 'The History of Node.js', topic: 'Node.js', date: '2020-08-25T00:00:00Z', id:"1", contributorId:"1"},
    { name: 'Understanding Docker Concepts', topic: 'Containers', date: '2020-07-23T00:00:00Z', id:"2", contributorId:"2"},
    { name: 'Linting in Node.js using ESLint', topic: 'Node.js', date: '2020-08-24T00:00:00Z', id:"3", contributorId:"2"},
    { name: 'REST APIs - Introductory guide', topic: 'API', date: '2020-06-26T00:00:00Z', id:"4", contributorId:"1"},
];

let contributors = [
    { name: 'John Doe', url: '/john-doe', major: 'Computer Science', id:"1"},
    { name: 'Jane Doe', url: '/jane-doe', major: 'Physics', id:"2"},
];
*/

const ArticleType = new GraphQLObjectType({
    name: 'Article',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        topic: { type: GraphQLString },
        date: { type: GraphQLString },
        contributorId: { type: GraphQLID },
        contributor:{
            type: ContributorType,
            resolve(parent,args){
                return Contributor.findById(parent.contributorId);
//                return _.find(contributors,{id:parent.contributorId})
            }
        }
    })
});

const ContributorType = new GraphQLObjectType({
    name: 'Contributor',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        url: { type: GraphQLString },
        major: { type: GraphQLString },
        articles:{
            type: new GraphQLList(ArticleType),
            resolve(parent,args){
                return Article.find({contributorId:parent.id})
//                return _.filter(articles, {contributorId:parent.id})
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
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
                return Article.findById(args.id)
//                return _.find(articles,{'id':args.id})
            }
        },
        articleByTopic: {
            type: new GraphQLList(ArticleType),
            args: {topic:{type: GraphQLString}},
            resolve(parent,args){
                return Article.find({'topic':args.topic})
//                return _.filter(articles,{'topic':args.topic})
            }
        },
        contributor: {
            type: ContributorType,
            args: {id:{type: GraphQLID}},
            resolve(parent,args){
                return Contributor.findById(args.id)
//                return _.find(contributors,{'id':args.id})
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        addArticle: {
            type: ArticleType,
            args: {
                name:{type: new GraphQLNonNull(GraphQLString)},
                topic:{type: new GraphQLNonNull(GraphQLString)},
                date: {type: new GraphQLNonNull(GraphQLString)},
                contributorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let article=new Article({
                    name: args.name,
                    topic: args.topic,
                    date:args.date,
                    contributorId:args.contributorId
                })
                return article.save();
            }
        },
        addContributor: {
            type: ContributorType,
            args: {
                name:{type: new GraphQLNonNull(GraphQLString)},
                major:{type: GraphQLString},
                url: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                let contributor= new Contributor({
                    name:args.name,
                    major:args.major,
                    url:args.url
                })
                return contributor.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});