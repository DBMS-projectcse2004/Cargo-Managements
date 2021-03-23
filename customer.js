var mongoose = require("mongoose");
var schema = mongoose.Schema;

var customerSchema = new schema({
    firstname : String,
    lastname: String,
    email : String,
    password: String,
    orders:[]
});

module.exports = mongoose.model("customer",customerSchema);