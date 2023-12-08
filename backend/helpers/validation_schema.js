const Joi = require("joi");

// Validation schema for user registration
const authSchema = Joi.object({
    userName: Joi.string().min(3).max(30).required(),
    email: Joi.string()
        .email({
            minDomainSegments: 1,
            tlds: { allow: ["com", "net", "student", "hcmiu", "vn"] },
        })
        .required(),
    password: Joi.string().min(4).required(),
});

// Validation schema for user login
const loginSchema = Joi.object({
    // identifier can be either email or username
    identifier: Joi.alternatives().try(
        Joi.string()
            .email({
                minDomainSegments: 1,
                tlds: { allow: ["com", "net", "student", "hcmiu", "vn"] },
            })
            .required(),
        Joi.string().min(3).max(30).required()
    ),

    // password field
    password: Joi.string().min(4).required(),
});

module.exports = {
    authSchema,
    loginSchema,
};
