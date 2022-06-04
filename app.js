const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const Joi = require('joi');
const { medicalSchema } = require('./schemas.js');
const { medicineSchema } = require('./schemas2.js');
const { employeeSchema } = require('./schemas3.js');
const { customerSchema } = require('./schemas4.js');
const mongoose = require('mongoose');
const Medical = require('./models/medical');
const Medicine = require('./models/medicine');
const Employee = require('./models/employee');
const Customer = require('./models/customer');
const { captureRejectionSymbol } = require('events');
const catchAsync = require('./utils/catchAsync');
const methodOverride = require('method-override');
const expresserror = require('./utils/ExpressError');
const app = express();
mongoose.connect('mongodb://localhost:27017/medicalmanagement');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true })) //to parse the post request
app.use(methodOverride('_method')) //form can only send get post request.So we override it to use fake fetch update edit request
const validatedealer = (req, res, next) => {

    const { error } = medicalSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new expresserror(msg, 400)
    } else {
        next();
    }
}
const validatemedicine = (req, res, next) => {
    const { error } = medicineSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new expresserror(msg, 400)
    } else {
        next();
    }
}
const validateemployee = (req, res, next) => {
    const { error } = employeeSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new expresserror(msg, 400)
    } else {
        next();
    }
}
const validatecustomer = (req, res, next) => {
    const { error } = customerSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new expresserror(msg, 400)
    } else {
        next();
    }
}
app.get('/', (req, res) => {
    res.render('home')
})
app.get('/medics', catchAsync(async(req, res) => {
    const medical = await Medical.find({});
    res.render('medical/index', { medical });
}))
app.get('/medics/dealer/view', catchAsync(async(req, res) => {
    const medical = await Medical.find({});
    res.render('medical/viewdealer', { medical });
}))
app.get('/medics/dealer/add', catchAsync(async(req, res) => {
    res.render('medical/adddealer');
}))
app.post('/medics', validatedealer, catchAsync(async(req, res, next) => {
    if (!req.body.medical) throw new expresserror('Invalid Campground Data', 400);
    const medical = new Medical(req.body.medical);
    await medical.save();
    res.redirect(`/medics/${medical._id}`)
}))
app.get('/medics/:id', catchAsync(async(req, res) => {
    const medical = await Medical.findById(req.params.id)
    res.render('medical/show', { medical });
}))
app.get('/medics/:id/edit', catchAsync(async(req, res) => {
    const medical = await Medical.findById(req.params.id);
    res.render('medical/edit', { medical });
}))

app.put('/medics/:id', validatedealer, catchAsync(async(req, res) => {
    const { id } = req.params;
    const medical = await Medical.findByIdAndUpdate(id, {...req.body.medical })
    res.redirect(`/medics/${medical._id}`)
}))
app.delete('/medics/:id', catchAsync(async(req, res) => {
    const { id } = req.params;
    await Medical.findByIdAndDelete(id);
    res.redirect('/medics')
}))


//medicine routes



app.get('/medics/medicine/view', catchAsync(async(req, res) => {
    const medicine = await Medicine.find({});
    res.render('medical/viewmedicine', { medicine });
}))
app.get('/medics/medicine/add', catchAsync(async(req, res) => {
    res.render('medical/addmedicine');
}))
app.post('/medics/medicine', validatemedicine, catchAsync(async(req, res, next) => {
    if (!req.body.medicine) throw new expresserror('Invalid Medicine Data', 400);
    const medicine = new Medicine(req.body.medicine);
    await medicine.save();
    res.redirect(`/medics/medicine/${medicine._id}`)
}))
app.get('/medics/medicine/:id', catchAsync(async(req, res) => {
    const medicine = await Medicine.findById(req.params.id)
    res.render('medical/show2', { medicine });
}))
app.get('/medics/medicine/:id/edit', catchAsync(async(req, res) => {
    const medicine = await Medicine.findById(req.params.id);
    res.render('medical/edit2', { medicine });
}))
app.put('/medics/medicine/:id', validatemedicine, catchAsync(async(req, res) => {
    const { id } = req.params;
    const medicine = await Medicine.findByIdAndUpdate(id, {...req.body.medicine })
    res.redirect(`/medics/medicine/${medicine._id}`)
}))
app.delete('/medics/medicine/:id', catchAsync(async(req, res) => {
    const { id } = req.params;
    await Medicine.findByIdAndDelete(id);
    res.redirect('/medics')
}))



//employee routes


app.get('/medics/employee/view', catchAsync(async(req, res) => {
    const employee = await Employee.find({});
    res.render('medical/viewemployee', { employee });
}))
app.get('/medics/employee/add', catchAsync(async(req, res) => {
    res.render('medical/addemployee');
}))
app.post('/medics/employee', validateemployee, catchAsync(async(req, res, next) => {
    if (!req.body.employee) throw new expresserror('Invalid Employee Data', 400);
    const employee = new Employee(req.body.employee);
    await employee.save();
    res.redirect(`/medics/employee/${employee._id}`)
}))
app.get('/medics/employee/:id', catchAsync(async(req, res) => {
    const employee = await Employee.findById(req.params.id)
    res.render('medical/show3', { employee });
}))
app.get('/medics/employee/:id/edit', catchAsync(async(req, res) => {
    const employee = await Employee.findById(req.params.id);
    res.render('medical/edit3', { employee });
}))
app.put('/medics/employee/:id', validateemployee, catchAsync(async(req, res) => {
    const { id } = req.params;
    const employee = await Employee.findByIdAndUpdate(id, {...req.body.employee })
    res.redirect(`/medics/employee/${employee._id}`)
}))
app.delete('/medics/employee/:id', catchAsync(async(req, res) => {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    res.redirect('/medics')
}))

//customer routes


app.get('/medics/customer/view', catchAsync(async(req, res) => {
    const customer = await Customer.find({});
    res.render('medical/viewcustomer', { customer });
}))
app.get('/medics/customer/add', catchAsync(async(req, res) => {
    res.render('medical/addcustomer');
}))
app.post('/medics/customer', validatecustomer, catchAsync(async(req, res, next) => {
    if (!req.body.customer) throw new expresserror('Invalid Employee Data', 400);
    const customer = new Customer(req.body.customer);
    await customer.save();
    res.redirect(`/medics/customer/${customer._id}`)
}))
app.get('/medics/customer/:id', catchAsync(async(req, res) => {
    const customer = await Customer.findById(req.params.id)
    res.render('medical/show4', { customer });
}))
app.get('/medics/customer/:id/edit', catchAsync(async(req, res) => {
    const customer = await Customer.findById(req.params.id);
    res.render('medical/edit4', { customer });
}))
app.put('/medics/customer/:id', validatecustomer, catchAsync(async(req, res) => {
    const { id } = req.params;
    const customer = await Customer.findByIdAndUpdate(id, {...req.body.customer })
    res.redirect(`/medics/customer/${customer._id}`)
}))
app.delete('/medics/customer/:id', catchAsync(async(req, res) => {
    const { id } = req.params;
    await Customer.findByIdAndDelete(id);
    res.redirect('/medics')
}))






app.all('*', (req, res, next) => {
    next(new expresserror('Page not found', 404))
})
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})
app.listen(8000, () => {
    console.log('Serving on port 8000')
})