const mongoose= require("mongoose")
const Schema= mongoose.Schema

const chartListSchema= new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    DataList: [{
        collectionId: Schema.Types.ObjectId
    }]
}, {timestamps: true});
module.exports = mongoose.model('chartList', chartListSchema);