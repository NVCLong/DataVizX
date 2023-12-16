const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Report Schema
const ReportSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        content: {
            type: String,
            require: true,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("report", ReportSchema);
