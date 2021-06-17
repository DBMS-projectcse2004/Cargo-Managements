//detailed comments will be added
//DBMS-PROJECT
//TOPIC : CARGO MANAGEMENT SYSTEM
const express = require("express");
const app = express();
const mongoose = require("mongoose");
var ejs = require("ejs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
mongoose.connect("mongodb://localhost:27017/Cargo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
var customers = require("./customer");
var orders = require("./order");
var bodyParser = require("body-parser");
const customer = require("./customer");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded());
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname + "/public"));

app.get("/sign-up", (req, res) => {
  res.sendFile(__dirname + "/sign-up.html");
});
app.get("/sign-in", (req, res) => {
  res.sendFile(__dirname + "/sign-in.html");
});

//REGISTRATION MODULE CODES

app.post("/sign-up", (req, res) => {
  // generation of accounts and adds to customer collection in database
  // checks if the entered password and retyped password is correct or not if correct
  //the firstname,lastname,email,password is stored in the database
  if (req.body.password == req.body.retypePassword) {
    customers.create(
      {
        // firstname: req.body.firstname,
        // lastname: req.body.lastname,
        // email: req.body.email,
        // password: req.body.password,
      },
      (err, save) => {
        // callback function to check the error and success details
        if (err) {
          console.log(err.errors.firstname.ValidatorError );
          //    can be used to display modal //for future reference
        //   if (err.keyPattern.email == 1) {
        //     console.log("email already exixst");
        //   }
        } 
        else {
          console.log(save);
          res.redirect("/");
        }
      }
    );
  } // if entered password and redirected password is not correct then the website redirects to the same page
  else {
    res.redirect("/sign-up");
  }
});

//AUTHENTICATION MODULE CODES

app.post("/sign-in", (req, res) => {
  customers.findOne(
    {
      email: req.body.semail,
    },
    (err, save) => {
      //CHECKS THE DB WHETHER EMAIL IS FOUND OR NOT
      if (err) {
        console.log(err);
      } else {
        if (save == null) {
          app.get("/error-mail-not-found", (req, res) => {
            //add the mail not found page here(PENDING)
          });
          console.log("mail not found");
        } else if (save.password == req.body.spassword) {
          //IF EMAIL IS FOUND THEN CHECK THE PASSWORD IN THE DB TO THE PASSWORD ENTERED BY THE USER IN THE SIGN IN PAGE
          customers.findOne(
            {
              email: req.body.semail,
            },
            (err, user) => 
            {
              app.get("/user-specific", (req, res) => {
                if (err) {
                  console.log(err);
                } else {
                  res.render("user");
                }
              });
              app.get("/enter-order", (req, res) => {
                if (err) {
                  console.log(err);
                } else {
                  const idx = user._id;
                  res.render("order", {
                    user: user,
                  });

                  app.get("/my-order", (req, res) => {
                    customers.findById(idx, (err, save) => {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log(save.orders);
                        orders.find(
                          {
                            _id: {
                              $in: save.orders,
                            },
                          },
                          (err, myorders) => {
                            if (err) {
                              console.log(err);
                            } else {
                              res.render("myorders", {
                                myorders: myorders,
                              });
                            }
                          }
                        );
                      }
                    });
                  });
                }
              });
              res.redirect("/user-specific");
            }
          );
        } else {
          console.log("entered password is wrong");
        }
      }
    }
  );
});

app.post("/enter-order", (req, res) => {
  customers.findById(req.body.id, (err, savex) => {
    if (err) {
      console.log(err);
    } else {
      orders.create(
        {
          cargo_destination: req.body.destination,
          cargo_desc: req.body.desc,
        },
        (err, save) => {
          if (err) {
            console.log(err);
          } else {
            customers.findByIdAndUpdate(
              req.body.id,
              {
                $push: {
                  orders: save._id,
                },
              },
              (err, savey) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(savey);
                  res.redirect("/enter-order");
                }
              }
            );
          }
        }
      );
    }
  });
});
app.get("/user", (req, res) => {
  res.render("user");
});

app.listen(3000, (req, res) => {
  console.log("server is running");
});
// HEHE DOUBLE CENTURY 