const Joi = require('joi');

const authSchema = Joi.object({
    email: Joi.string().email({minDomainSegments: 4, tlds:{allow: ['com', 'net','student','hcmiu', 'vn']}}).required(),
    password: Joi.string().min(4).required(),
})

module.exports = {
    authSchema,
}