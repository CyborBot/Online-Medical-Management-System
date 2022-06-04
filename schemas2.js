const Joi = require('joi');
module.exports.medicineSchema = Joi.object({
    medicine: Joi.object({
        medname: Joi.string().required(),
        medprice: Joi.number().required().min(0),
        medimage: Joi.string().required(),
        meddealer: Joi.string().required(),
        meddescription: Joi.string().required(),
        medstock: Joi.number().required().min(0),
        medcode: Joi.number().required().min(0)
    }).required()
});