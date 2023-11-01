const Joi = require('joi');

const UserSchema = Joi.object({

    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(8).max(30).required(),
    repeat_password: Joi.ref('password'),

    access_token: [
        Joi.string(),
        Joi.number(),
    ],

    birth_year: Joi.number().integer().min(1900).max(2013),
})