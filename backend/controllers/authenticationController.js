const express = require("express");
const createError = require("http-errors");
const User = require("../models/user.model");
const cookieParser = require("cookie-parser");
const { authSchema, loginSchema } = require("../helpers/validation_schema");
const {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
} = require("../helpers/jwt_helper");

// Create a router
const router = express.Router();
router.use(cookieParser());

class AuthenticationController {
    static async register(req, res, next) {
        console.log(req.body)
        try {
            // If email or password field is blank it will return an error
            const result = {
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password,
            }
            console.log(result)

            // Email must be unique
            const doesExitEmail = await User.findOne({ email: result.email });
            if (doesExitEmail)
                throw createError.NotFound(`${result.email} is already registered!`);

            // Username must be unique
            const doesExitUserName = await User.findOne({
                userName: result.userName,
            });
            if (doesExitUserName)
                throw createError.NotFound(`${result.userName} is already taken!`);

            // Save user to the database
            const user = new User(result);
            console.log(user);
             user.save();
            res.json({ message: "User registered successfully!" });
        } catch (error) {
            // Return an error statement if error is found

            if (error.isJoi === true) error.status = 422;
            next(error);
        }
    }

    // Login function
    static async login(req, res, next) {
        try {
            // Validate the email and password
            const result = {
                identifier: req.body.identifier,
                password: req.body.password
            };

            // Return email if it is registered
            const user = await User.findOne({
                $or: [{ email: result.identifier }, { userName: result.identifier }],
            });

            // If not: throw an error
            if (!user) throw createError.NotFound("User not registered!");

            // If match: compare the password
            const isMatch = await user.isValidPassword(result.password);

            // If not: throw an error
            if (!isMatch)
                throw createError.Unauthorized("Username/Password not valid!");

            // If match: generate JWT token
            const accessToken = await signAccessToken(user.id);
            const refreshToken = await signRefreshToken(user.id);

            // Generate cookies
            res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
            });
            res.cookie("userId", user.id);

            const userDetails = await User.findOne({ _id: user.id }).select("userName");

            res.json({ accessToken, refreshToken, userDetails });
        } catch (error) {
            // Return an error statement if validation error is found
            if (error.isJoi === true)
                return next(createError.BadRequest("Invalid Username/Password"));
            next(error);
        }
    }

    // Logout function
    static async logout(req, res, next) {
        // Delete both accessToken and refreshToken using clearCookie
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.clearCookie("userId")

        // Send a message to the user
        res.send("Logged out!");
    }

    static async deleteLogout(req, res, next) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) throw createError.BadRequest();
            const userID = await verifyRefreshToken(refreshToken);
        } catch (error) {
            next(error);
        }
    }
}
module.exports = AuthenticationController;
