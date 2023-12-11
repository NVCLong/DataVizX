const mongoose= require('mongoose');
const Schema = mongoose.Schema;


const DataSchema= new Schema({
    collectionId:{
        type:  Schema.Types.ObjectId,
        required: true
    },
    able:{
        type: Schema.Types.Boolean,
        required: true,
        default: false
    },
    data: [{
        category: Schema.Types.String,
        value: Schema.Types.Number,
    }],
})