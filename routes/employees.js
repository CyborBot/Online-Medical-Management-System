const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const expresserror = require('../utils/ExpressError');
const Employee = require('../models/employee');
const { employeeSchema } = require('../schemas3.js');

const validateemployee = (req, res, next) => {
    const { error } = employeeSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new expresserror(msg, 400)
    } else {
        next();
    }
}

router.get('/view', catchAsync(async(req, res) => {
    const employee = await Employee.find({});
    res.render('medical/viewemployee', { employee });
}))
router.get('/add', catchAsync(async(req, res) => {
    res.render('medical/addemployee');
}))
router.post('/', validateemployee, catchAsync(async(req, res, next) => {
    if (!req.body.employee) throw new expresserror('Invalid Employee Data', 400);
    const employee = new Employee(req.body.employee);
    await employee.save();
    req.flash('success', 'Successfully Add Employee Details');
    res.redirect(`/medics/employee/${employee._id}`)
}))
router.get('/:id', catchAsync(async(req, res) => {
    const employee = await Employee.findById(req.params.id)
    if (!customer) {
        req.flash('error', 'Cannot find that Employee Details');
        return res.redirect('/medics');
    }
    res.render('medical/show3', { employee });
}))
router.get('/:id/edit', catchAsync(async(req, res) => {
    const employee = await Employee.findById(req.params.id);
    if (!customer) {
        req.flash('error', 'Cannot find that Employee Details');
        return res.redirect('/medics');
    }
    res.render('medical/edit3', { employee });
}))
router.put('/:id', validateemployee, catchAsync(async(req, res) => {
    const { id } = req.params;
    const employee = await Employee.findByIdAndUpdate(id, {...req.body.employee })
    req.flash('success', 'Successfully Updated Employee Details');
    res.redirect(`/medics/employee/${employee._id}`)
}))
router.delete('/:id', catchAsync(async(req, res) => {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    res.redirect('/medics')
}))
module.exports = router;