const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const dotenv = require("dotenv");
dotenv.config({ path: "./backend/.env" });

const jwt={
    // sign access token for each user
     signAccessToken: (userID) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: 10,
                issuer: "DataVizX Team",
                audience: userID,
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.error(err.message);
                    return reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    },

    verifyAccessToken: (req, res, next) => {
         try {
             const accessToken = req.body.access_token;
             const secret = process.env.ACCESS_TOKEN_SECRET;
             console.log(req.body)

             if (accessToken) {
                 JWT.verify(accessToken, secret, (err) => {
                     if (err) {
                         console.error("JWT Verification Error access:", err);
                         return res.status(401).json({status: "false", message: "Invalid signature"});
                     }

                     // Token is valid, proceed to the next middleware
                     res.status(200).json({status: "true"});
                     next();
                 });
             } else {
                 res.status(401).json({status: "false", message: "Access token missing"});
             }
         }catch (e) {
             console.log(e)
         }
    },

    signRefreshToken: (userID) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.REFRESH_TOKEN_SECRET;
            const options = {
                expiresIn: 20,
                issuer: "DataVizX Team",
                audience: userID,
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.error(err.message);
                    return reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    },

    verifyRefreshToken: (req, res) => {
        try{
            const refreshToken = req.body.refreshToken;
            const secret = process.env.REFRESH_TOKEN_SECRET;
            if (refreshToken) {
                JWT.verify(refreshToken, secret, (err) => {
                    if (err) {
                        console.error("JWT Verification Error refresh: ", err);
                        return res.status(500).json({ status: "false", message: "Internal Server Error" });
                    }
                    const payload = {};
                    const options = {
                        expiresIn: 10,
                        issuer: "DataVizX Team",
                        audience: req.body.userId,
                    };
                    let newAccessToken= JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET, options);
                    res.json({ status: "true", newAccessToken: newAccessToken });
                });
            } else {
                res.json({ status: "false", message: "Refresh token missing" });
            }
        }catch(e){
            console.log(e)
        }
    }
};

module.exports =  jwt
