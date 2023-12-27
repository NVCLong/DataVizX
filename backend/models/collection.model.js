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

// collectionSchema.index({ 'values.value': 1 }, { sparse: true });

const Collection = mongoose.model("collection", collectionSchema);

// async function init() {
//   await Collection.init();
// }
// init();
module.exports = Collection;
