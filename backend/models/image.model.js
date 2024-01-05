const mongoose = require('mongoose');

// define image schema
const imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});

module.exports = new mongoose.model('Image', imageSchema);