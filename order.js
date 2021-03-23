var mongoose = require('mongoose');
var schema = mongoose.Schema ;

const OrderSchema = new schema({
    cargo_destination:{
        type:String.apply,
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
    }
})