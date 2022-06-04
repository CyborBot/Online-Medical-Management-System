const Joi = require('joi');
module.exports.medicalSchema = Joi.object({
    medical: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required(),
        phone: Joi.number().required().min(0),
    }).required()
});