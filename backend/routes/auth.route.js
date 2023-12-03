const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const User = require('../models/user.model')
const {authSchema} = require('../helpers/validation_schema')
const {signAccessToken, signRefreshToken, verifyRefreshToken} = require('../helpers/jwt_helper')
const { verify } = require('jsonwebtoken')

router.post('/register', async(req, res, next) => {

    try {
        // If email or password field is blank it will return an error
        // if(!email || !password) throw createError.BadRequest
        const result = await authSchema.validateAsync(req.body)

        // Email must be unique
        const doesExit = await User.findOne({email: result.email})
        if (doesExit) throw createError.Conflict(`${result.email} is already registered!`)

        // Save user to the database
        const user = new User(result)
        const savedUser = await user.save()

        // Generate JWT token
        const accessToken = await signAccessToken(savedUser.id)
        const refreshToken = await signRefreshToken(savedUser.id)
        res.send({accessToken, refreshToken})
    } catch(error) {
        // Return an error statement if error is found
        if (error.isJoi === true) error.status = 422
    next(error)
    }
})

router.post('/login', async(req, res, next) => {
    // res.send("Login route")
    try {
        // Validate the email and password
        const result = await authSchema.validateAsync(req.body)
        // Return email if it is registered
        const user = await User.findOne({email: result.email})
        // If not: throw an error
        if (!user) throw createError.NotFound("User not registered!")
        // If match: compare the password
        const isMatch = await user.isValidPassword(result.password)
        // If not: throw an error
        if (!isMatch) throw createError.Unauthorized("Username/Password not valid!")
        // If match: generate JWT token
        const accessToken = await signAccessToken(user.id)
        const refreshToken = await signRefreshToken(user.id)
        res.send({accessToken, refreshToken})
    } catch (error) {
        // Return an error statement if error is found
        if (error.isJoi === true) return next(createError.BadRequest("Invalid Username/Password"))
        next(error)
    }
})

router.post('/logout', async(req, res, next) => {
    res.send("Logout route")
})

router.post('/refresh-token', async(req, res, next) => {
    try {
        const {refreshToken} = req.body
        if (!refreshToken) throw createError.BadRequest()

        const userID = await verifyRefreshToken(refreshToken)
        const accessToken = await signAccessToken(userID)
        const refreshToken_sign = await signRefreshToken(userID)
        res.send({accessToken: accessToken, refreshToken: refreshToken_sign})
    } catch (error) {
        next (error)
    }
})

router.delete('/logout', async(req, res, next) => {
    res.send("Logout route")
})


module.exports = router