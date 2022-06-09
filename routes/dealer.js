const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const expresserror = require('../utils/ExpressError');
const Medical = require('../models/medical');
const { medicalSchema } = require('../schemas.js');
const validatedealer = (req, res, next) => {

    const { error } = medicalSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new expresserror(msg, 400)
    } else {
        next();
    }
}

router.get('/', catchAsync(async(req, res) => {
    const medical = await Medical.find({});
    res.render('medical/index', { medical });
}))
router.get('/dealer/view', catchAsync(async(req, res) => {
    const medical = await Medical.find({});
    res.render('medical/viewdealer', { medical });
}))
router.get('/dealer/add', catchAsync(async(req, res) => {
    res.render('medical/adddealer');
}))
router.post('/', validatedealer, catchAsync(async(req, res, next) => {
    if (!req.body.medical) throw new expresserror('Invalid Campground Data', 400);
    const medical = new Medical(req.body.medical);
    await medical.save();
    req.flash('success', 'Successfully Made Dealer Details');
    res.redirect(`/medics/${medical._id}`)
}))
router.get('/:id', catchAsync(async(req, res) => {
    const medical = await Medical.findById(req.params.id)
    if (!customer) {
        req.flash('error', 'Cannot find that dealer');
        return res.redirect('/medics');
    }
    res.render('medical/show', { medical });
}))
router.get('/:id/edit', catchAsync(async(req, res) => {
    const medical = await Medical.findById(req.params.id);
    if (!customer) {
        req.flash('error', 'Cannot find that customer');
        return res.redirect('/medics');
    }
    res.render('medical/edit', { medical });
}))

router.put('/:id', validatedealer, catchAsync(async(req, res) => {
    const { id } = req.params;
    const medical = await Medical.findByIdAndUpdate(id, {...req.body.medical })
    req.flash('success', 'Successfully Updated Dealer Details');
    res.redirect(`/medics/${medical._id}`)
}))
router.delete('/:id', catchAsync(async(req, res) => {
    const { id } = req.params;
    await Medical.findByIdAndDelete(id);
    res.redirect('/medics')
}))
module.exports = router;