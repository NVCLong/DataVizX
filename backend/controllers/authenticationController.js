const express = require("express");
const createError = require("http-errors");
const { authSchema, loginSchema } = require("../helpers/validation_schema");
const {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
} = require("../helpers/jwt_helper");
const User = require("../models/user.model");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

class AuthenticationController {
    static async register(req, res, next) {
        try {
            // If email or password field is blank it will return an error
            // if(!email || !password) throw createError.BadRequest
            const result = await authSchema.validateAsync(req.body);

            // Email must be unique
            const doesExit = await User.findOne({ email: result.email });
            if (doesExit)
                throw createError.Conflict(`${result.email} is already registered!`);

            // Save user to the database
            const user = new User(result);
            const savedUser = await user.save();

            // Generate JWT token
            const accessToken = await signAccessToken(savedUser.id);
            const refreshToken = await signRefreshToken(savedUser.id);
            res.send({ accessToken, refreshToken });
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
            const result = await loginSchema.validateAsync(req.body);

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

            res.send({ accessToken, refreshToken });
        } catch (error) {
            // Return an error statement if validation error is found
            if (error.isJoi === true)
                return next(createError.BadRequest("Invalid Username/Password"));
            next(error);
        }
    }

    // Logout function
    static async logout(req, res, next) {
        // Delete both accessToken and refreshToken
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.send("Logged out!");
    }

    // Refresh token function
    static async refreshToken(req, res, next) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) throw createError.BadRequest();

            const userID = await verifyRefreshToken(refreshToken);
            const accessToken = await signAccessToken(userID);
            const refreshToken_sign = await signRefreshToken(userID);
            res.send({ accessToken: accessToken, refreshToken: refreshToken_sign });
        } catch (error) {
            next(error);
        }
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

router.post("/register", AuthenticationController.register);
router.post("/login", AuthenticationController.login);
router.post("/logout", AuthenticationController.logout);
router.post("/refresh-token", AuthenticationController.refreshToken);
router.delete("/deleteLogout", AuthenticationController.deleteLogout);

module.exports = AuthenticationController;
