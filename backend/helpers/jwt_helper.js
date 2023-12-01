const JWT = require('jsonwebtoken')
const createError = require('http-errors')
const dotenv = require('dotenv');
dotenv.config({
    path: `${__dirname}/config/.env.development`
});

module.exports = {
    // sign access token to an user
    signAccessToken: (userID) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
                expiresIn: '1h',
                issuer: 'DataVizX Team',
                audience: userID,
            }
        JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
                console.log(err.message)
                return reject(createError.InternalServerError())
                }
                resolve(token)
            })
        })
    }
}