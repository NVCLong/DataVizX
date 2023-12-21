const  mongoose = require('mongoose')
const Schema = mongoose.Schema

const collectionSchema= new Schema({
    value: [{
        category: Schema.Types.String,
        value: Schema.Types.Number
    }],
},{timestamps: true})
module.exports= mongoose.model('collection', collectionSchema)