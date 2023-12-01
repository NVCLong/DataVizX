const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

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


UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        console.log(this.email, this.password)
        const hasedPassword = await bcrypt.hash(this.password, salt)
        this.password = hasedPassword
        next()
    } catch (error) {
        next(error)
    }
})


const User = mongoose.model('user', UserSchema)
module.exports = User