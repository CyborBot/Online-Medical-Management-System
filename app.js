const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const Joi = require('joi');
const session = require('express-session');
const flash = require('connect-flash')



const mongoose = require('mongoose');




const { captureRejectionSymbol } = require('events');
const catchAsync = require('./utils/catchAsync');
const methodOverride = require('method-override');
const expresserror = require('./utils/ExpressError');



//route handling
const dealers = require('./routes/dealer');
const medicines = require('./routes/medicines');
const employees = require('./routes/employees');
const customers = require('./routes/customers');




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
app.use(express.static(path.join(__dirname, 'public')));
const sessionconfig = {
    secret: 'thisshouldbesecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionconfig));
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error  ');
    next();
})



app.use('/medics', dealers);
app.use('/medics/medicine', medicines);
app.use('/medics/employee', employees);
app.use('/medics/customer', customers);


app.get('/', (req, res) => {
    res.render('home')
})



//medicine routes







//employee routes




//customer routes









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