//KINDLY IGNORE THE COMMENTED PART (DONT DELETE EM IVE KEPT THEM FOR REFERENCE)
//DBMS-PROJECT
//TOPIC : CARGO MANAGEMENT SYSTEM 

const express = require("express")
const app = express();
const mongoose = require("mongoose"); 
mongoose.connect("mongodb://localhost:27017/Cargo" , {useNewUrlParser : true , useUnifiedTopology:true});
var customers = require("./customer")
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded());
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
});

app.use(express.static(__dirname+"/public"));

app.get("/sign-up",(req,res)=>{
    res.sendFile(__dirname + "/sign-up.html");
});
app.get("/sign-in" ,(req,res)=>{
    res.sendFile(__dirname+"/sign-in.html");
})

//REGISTRATION MODULE CODES

app.post("/sign-up",(req,res)=>{
// generation of accounts and adds to customer collection in database 
// checks if the entered password and retyped password is correct or not if correct
//the firstname,lastname,email,password is stored in the database

   if(req.body.password == req.body.retypePassword){
       customers.create({
           firstname : req.body.firstname,
           lastname:req.body.lastname,
           email:req.body.email,
           password:req.body.password
       },(err,save)=>{       // callback function to check the error and success details 
           if(err){
               console.log(err);
           }else{
               console.log(save);
               res.redirect("/")
           }
       });
   }else   // if entered password and redirected password is not correct then the website redirects to the same page
   {  
       res.redirect("/sign-up");
   } 

});

//AUTHENTICATION MODULE CODES 

app.post("/sign-in",(req,res)=>{
    customers.findOne({"email":req.body.semail},(err,save)=>{   //CHECKS THE DB WHETHER EMAIL IS FOUND OR NOT 
        if(err){
            console.log(err);
        }else{
            if(save.password == req.body.spassword){   //IF EMAIL IS FOUND THEN CHECK THE PASSWORD IN THE DB TO THE PASSWORD ENTERED BY THE USER IN THE SIGN IN PAGE
                console.log("account found");
                console.log(save);
            }
        }
    })
});


app.listen(3000,(req,res)=>{
    console.log("server is running");
    
});



//database section (only the schemas initialisation)
// var orderSchema = new mongoose.Schema({
//     pro_name : String,
//     weight: Number,
//     pro_cost:Number,
//     Made_in:String,
//     ship_amt : Number, //will be set default for all orders 
//     address: String,
//     transactions_det:[]
// });
// var transactions = new mongoose.Schema({
//     cardnum : String,
//     exp_date: String,
//     cv_code : Number,
//     card_owner: String
// });

//REGISTRATION MODULE SCHEMA 
// var customerSchema = new mongoose.Schema({
//     firstname : String,
//     lastname: String,
//     email : String,
//     password: String,
//     orders:[

//     ]
// });
// var customers = mongoose.model("customer",customerSchema);

//end of the db schema initialisation section 