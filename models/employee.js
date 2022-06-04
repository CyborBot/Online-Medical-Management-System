const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const employeeSchema = new Schema({
    empprice: Number,
    empname: String,
    empcode: Number,
    empphone: Number,
    empaddress: String,
    empdescription: String,
    empimage: String
});
module.exports = mongoose.model("employee", employeeSchema)