var mongoose = require('mongoose');
var Schema = mongoose.Schema ; 
var transactions = require("./transaction").schema
const OrderSchema = new Schema({
    cargo_destination:{
        type:String,
        required:true
    },
    cargo_price:{
        type:Number,
        default:50000
    },
    cargo_status:{
        type:Boolean,
        default:false
    },
    cargo_desc:{
        type:String
    },
    transaction_Details:transactions
});

module.exports = mongoose.model("orders", OrderSchema);