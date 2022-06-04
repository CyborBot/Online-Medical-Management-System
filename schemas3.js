const Joi = require('joi');
module.exports.employeeSchema = Joi.object({
    employee: Joi.object({
        empname: Joi.string().required(),
        empprice: Joi.number().required().min(0),
        empimage: Joi.string().required(),
        empaddress: Joi.string().required(),
        empdescription: Joi.string().required(),
        empphone: Joi.number().required().min(0),
        empcode: Joi.number().required().min(0)
    }).required()
});