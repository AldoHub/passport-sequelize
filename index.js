const express = require("express");
const app= express();
var path = require("path");

const routes = require("./routes/routes");
const authRoutes = require("./routes/auth");
const sequelize = require("./config/sequelizeConfig");
const passportConfig = require("./libs/passportConfig");
const passport = require("passport");

//express sessions
let session = require('express-session');



//static folders that express will use
//to look for files
//main public folder
app.use(express.static("./public"));
//uploads Multer folder
app.use(express.static("./uploads"));
//users avatars
app.use(express.static("./users/avatars"));
//set the view engine to PUG
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "pug");





//body parser for the params
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//express sessions
//populates a cookie that will hepl passport to keep track of the user
app.use(session({
    secret: 'YHprvmaIW1',
    resave: false,
    saveUninitialized: false,
    //cookie: { secure: true }
}));

//passport session and initialize
app.use(passport.initialize());
app.use(passport.session());



// global property for auth users
// allows us to show or hide things based on wether the user is 
// authenticated or not
app.use((req, res, next)=>{
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});

//main routes
app.use("/", routes);
//app.use("/", login);
//auth routes
app.use("/auth", authRoutes);




app.listen(4000, ()=>{
    console.log("listening for traffic on por 4000");
});



