const mongoose= require('mongoose');
const Schema= mongoose.Schema

const noteSchema= new Schema({
    note:{
        type: Schema.Types.String,
    },
    able:{
      type: Schema.Types.Boolean,
       Default: true
    },
    chartId:{
        type: Schema.Types.ObjectId,
        required:true
    }
},{timestamps: true})

module.exports= mongoose.model('note', noteSchema)