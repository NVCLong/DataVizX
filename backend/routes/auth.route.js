const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const User = require('../models/user.model')

router.post('/register', async(req, res, next) => {

    try {
        const {email, password} = req.body

        // If email or password field is blank it will return an error
        if(!email || !password) throw createError.BadRequest

        // Email must be unique
        const doesExit = await User.findOne({email: email})
        if (doesExit) throw createError.Conflict(`${email} is already registered!`)

        // Save user to the database
        const user = new User({email, password})
        const savedUser = await user.save()

        res.send(savedUser)

    } catch(error) {
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