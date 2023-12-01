const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const dotenv = require('dotenv');
dotenv.config({
    path: `${__dirname}/config/.env.development`
});
require ('./helpers/init_mongodb')

const AuthRoute = require('./routes/auth.route.js')
const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// Home page

app.get('/', async (req, res, next) => {
    res.send("Welcome to DataVizX");
});

// Set route for API Authentication
app.use('/auth', AuthRoute)

// return error


app.use(async (req, res, next) => {
    next(createError.NotFound());
});

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})