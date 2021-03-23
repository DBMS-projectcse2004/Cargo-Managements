var mongoose = require("mongoose");
var Schema = mongoose.Schema ;
const transactionSchema = new Schema({
    transaction_Date : {
        type:Date,
        default:Date.now
    },
    card_details :{
        card_Number : {type:String,required:true},
        validity_Date:{ type:String,required:true},
        cvv:{type:Number,required:true}
    }
});

module.exports = mongoose.model("transactions",transactionSchema);