const Joi = require('joi');
module.exports.customerSchema = Joi.object({
    customer: Joi.object({
        cstname: Joi.string().required(),
        cstprice: Joi.number().required().min(0),
        cstimage: Joi.string().required(),
        cstaddress: Joi.string().required(),
        cstbuy: Joi.string().required(),
        cstphone: Joi.number().required().min(0),
        cstcode: Joi.number().required().min(0)
    }).required()
});