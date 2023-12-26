const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collectionSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    values: [
      {
        category: Schema.Types.String,
        value: Schema.Types.Number,
      },
    ],
  },
  { timestamps: true }
);

collectionSchema.index({ name: "text" });

module.exports = mongoose.model("collection", collectionSchema);
