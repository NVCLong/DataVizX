const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const User = require('../models/user.model')
const {authSchema} = require('../helpers/validation_schema')
const {signAccessToken} = require('../helpers/jwt_helper')

router.post('/register', async(req, res, next) => {

    try {
        const {email, password} = req.body

        // If email or password field is blank it will return an error
        // if(!email || !password) throw createError.BadRequest
        const result = await authSchema.validateAsync(req.body)
        // console.log(result)

        // Email must be unique
        const doesExit = await User.findOne({email: result.email})
        if (doesExit) throw createError.Conflict(`${result.email} is already registered!`)

        // Save user to the database
        const user = new User(result)
        const savedUser = await user.save()
        const accessToken = await signAccessToken(savedUser.id)
        res.send({accessToken})

    } catch(error) {
        if (error.isJoi === true) error.status = 422
    next(error)
    }
})

router.post('/login', async(req, res, next) => {
    res.send("Login route")
})

router.post('/logout', async(req, res, next) => {
    res.send("Logout route")
})

router.post('/refresh-token', async(req, res, next) => {
    res.send("Refresh-token route")
})

router.delete('/logout', async(req, res, next) => {
    res.send("Logout route")
})


module.exports = router