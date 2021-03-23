var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
var orders = require('./order').schema
var customerSchema = new Schema({
    firstname : {
        type:String,
        required:true
    },

    lastname: String,

    email :{
        type:String,
        unique:true,
        required:true
    },
    password: String,
    orders:[orders]
});

module.exports = mongoose.model("customer",customerSchema);