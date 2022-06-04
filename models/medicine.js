const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const medicineSchema = new Schema({
    medprice: Number,
    medname: String,
    medcode: Number,
    medstock: Number,
    meddealer: String,
    meddescription: String,
    medimage: String
});
module.exports = mongoose.model("Medicine", medicineSchema)