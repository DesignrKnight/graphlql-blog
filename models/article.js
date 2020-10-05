const mongoose = require('mongoose');
const Schema = mongoose.Schema

const articleSchema = new Schema({
    name: String,
    topic: String,
    date: String,
    contributorId:String
})
module.exports = mongoose.model('Article',articleSchema);