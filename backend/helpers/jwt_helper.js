const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const dotenv = require("dotenv");
dotenv.config({
    path: `${__dirname}/config/.env.development`,
});

module.exports = {
    // sign access token to each user
    signAccessToken: (userID) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: "20s",
                issuer: "DataVizX Team",
                audience: userID,
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    return reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    },
    verifyAccessToken: (req, res, next) => {
        if (!req.headers["authorization"]) return next(createError.Unauthorized());
        const authHeader = req.headers["authorization"];
        const bearerToken = authHeader.split(" ");
        const token = bearerToken[1];
        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                const message =
                    err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
                return next(createError.Unauthorized(message));
            }
            req.payload = payload;
            next();
        });
    },

    signRefreshToken: (userID) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.REFRESH_TOKEN_SECRET;
            const options = {
                expiresIn: "1y",
                issuer: "DataVizX Team",
                audience: userID,
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    return reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    },
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err, payload) => {
                    if (err) return reject(createError.Unauthorized());
                    const userID = payload.aud;
                    resolve(userID);
                }
            );
        });
    },
};