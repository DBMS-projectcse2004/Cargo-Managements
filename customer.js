var mongoose = require("mongoose");
var schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
var customerSchema = new schema({
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

    orders:{
        
    }
});

module.exports = mongoose.model("customer",customerSchema);