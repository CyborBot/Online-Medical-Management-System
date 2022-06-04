const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicalSchema = new Schema({
    title: String,
    price: Number,
    location: String,
    phone: Number,
    description: String,
    image: String

});
module.exports = mongoose.model('Medical', MedicalSchema)