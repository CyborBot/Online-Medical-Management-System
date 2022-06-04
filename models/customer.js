const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const customerSchema = new Schema({
    cstprice: Number,
    cstname: String,
    cstcode: Number,
    cstphone: Number,
    cstaddress: String,
    cstbuy: String,
    cstimage: String
});
module.exports = mongoose.model("customer", customerSchema)