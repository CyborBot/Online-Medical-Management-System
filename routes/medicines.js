const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const expresserror = require('../utils/ExpressError');
const Medicine = require('../models/medicine');
const { medicineSchema } = require('../schemas2.js');

const validatemedicine = (req, res, next) => {
    const { error } = medicineSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new expresserror(msg, 400)
    } else {
        next();
    }
}
router.get('/view', catchAsync(async(req, res) => {
    const medicine = await Medicine.find({});
    res.render('medical/viewmedicine', { medicine });
}))
router.get('/add', catchAsync(async(req, res) => {
    res.render('medical/addmedicine');
}))
router.post('/', validatemedicine, catchAsync(async(req, res, next) => {
    if (!req.body.medicine) throw new expresserror('Invalid Medicine Data', 400);
    const medicine = new Medicine(req.body.medicine);
    await medicine.save();
    req.flash('success', 'Successfully Add Medicine Details');
    res.redirect(`/medics/medicine/${medicine._id}`)
}))
router.get('/:id', catchAsync(async(req, res) => {
    const medicine = await Medicine.findById(req.params.id)
    if (!customer) {
        req.flash('error', 'Cannot find that Medicines Details');
        return res.redirect('/medics');
    }
    res.render('medical/show2', { medicine });
}))
router.get('/:id/edit', catchAsync(async(req, res) => {
    const medicine = await Medicine.findById(req.params.id);
    if (!customer) {
        req.flash('error', 'Cannot find that Medicine Details');
        return res.redirect('/medics');
    }
    res.render('medical/edit2', { medicine });
}))
router.put('/:id', validatemedicine, catchAsync(async(req, res) => {
    const { id } = req.params;
    const medicine = await Medicine.findByIdAndUpdate(id, {...req.body.medicine });
    req.flash('success', 'Successfully Updated Medicines Details');
    res.redirect(`/medics/medicine/${medicine._id}`)
}))
router.delete('/:id', catchAsync(async(req, res) => {
    const { id } = req.params;
    await Medicine.findByIdAndDelete(id);
    res.redirect('/medics')
}))
module.exports = router;