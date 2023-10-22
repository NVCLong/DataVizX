const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        lowercase: true, //avoid the case using the same email address but different in the uppercase
        unique: true, //Email must be unique
    },

    password: {
        type: String,
        require: true,

    }
})

const User = mongoose.model('user', UserSchema)
module.exports = User