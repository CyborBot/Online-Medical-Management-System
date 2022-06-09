const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const expresserror = require('../utils/ExpressError');
const Customer = require('../models/customer');
const { customerSchema } = require('../schemas4.js');

const validatecustomer = (req, res, next) => {
    const { error } = customerSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new expresserror(msg, 400)
    } else {
        next();
    }
}

router.get('/view', catchAsync(async(req, res) => {
    const customer = await Customer.find({});
    res.render('medical/viewcustomer', { customer });
}))
router.get('/add', catchAsync(async(req, res) => {
    res.render('medical/addcustomer');
}))
router.post('/', validatecustomer, catchAsync(async(req, res, next) => {

    // if (!req.body.customer) throw new expresserror('Invalid Employee Data', 400);
    const customer = new Customer(req.body.customer);
    await customer.save();
    req.flash('success', 'Successfully add a new customer');
    res.redirect(`/medics/customer/${customer._id}`)
}))
router.get('/:id', catchAsync(async(req, res) => {
    const customer = await Customer.findById(req.params.id)
    if (!customer) {
        req.flash('error', 'Cannot find that customer');
        return res.redirect('/medics');
    }
    res.render('medical/show4', { customer });
}))
router.get('/:id/edit', catchAsync(async(req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
        req.flash('error', 'Cannot find that customer');
        return res.redirect('/medics');
    }
    res.render('medical/edit4', { customer });
}))
router.put('/:id', validatecustomer, catchAsync(async(req, res) => {
    const { id } = req.params;
    const customer = await Customer.findByIdAndUpdate(id, {...req.body.customer })
    req.flash('success', 'Successfully Updated Customer Details');
    res.redirect(`/medics/customer/${customer._id}`)
}))
router.delete('/:id', catchAsync(async(req, res) => {
    const { id } = req.params;
    await Customer.findByIdAndDelete(id);
    res.redirect('/medics')
}))
module.exports = router;