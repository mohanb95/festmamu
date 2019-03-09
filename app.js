// =========================
// variable intitalized 
// =========================
var builder = require('botbuilder');
var express             = require("express"),
    app                 = express(),
    expressValidator    = require("express-validator"),
    bodyParser          = require("body-parser"),
    methodOverride      = require("method-override"),
    expressSanitizer    = require("express-sanitizer"),
    mongoose            = require("mongoose"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    User                = require("./models/user"),
    seedDB              = require("./seeds"),
    aws                 = require("aws-sdk"),
    bcrypt              = require('bcrypt-nodejs'),
    aSync               = require('async'),
    crypto              = require('crypto'),
    path                = require('path'),
    favicon             = require('static-favicon'),
    logger              = require('morgan'),
    cookieParser        = require('cookie-parser'),
    flash               = require('connect-flash'),
    session             = require('express-session');
    // builder = require('botbuilder');
//****************************************************
// route  variable declaration
//****************************************************
var converRoute      = require("./routes/conv");
var indexRoutes      = require("./routes/index");
var stageRoutes      = require("./routes/stage");
var artistRoutes     = require("./routes/artist");
var commentRoutes    = require("./routes/comments");
var merchRoutes      = require("./routes/merch");
var mailRoutes       = require("./routes/mail");
var middleware       = require("./middleware");


// =======================================
// db connectins and body parsing
// =======================================
// mongoose.connect("mongodb://localhost/festmamu");     // local mongo db
mongoose.connect("mongodb://Keith:festmamu@ds062889.mlab.com:62889/festmamu"); // public hosted mongo db
// http://powerful-river-69304.herokuapp.com/
// mongodb://admin:cloudnine@ds117829.mlab.com:17829/festmamu
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon());
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(cookieParser());
app.use(expressSanitizer());
app.use(methodOverride("_method"));
// app.use(session({ secret: 'session secret key' }));
// seedDB();
// =======================================
app.use(session({
    secret: "festMamu is",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 }
}));




var connector = new builder.ChatConnector({
    appId: 'cf79fde4-0886-4a5f-9388-5afbeb608ede',
    appPassword: 'AoRqywNmbqMMvKPM5GxphYG'
 });

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   res.locals.popup =req.flash("popup");
   next();
});


// ========================
// all the requests
// ========================
app.use("/api/messages", converRoute);
app.use("/", indexRoutes);
app.use("/stage",stageRoutes);
app.use("/artist",artistRoutes);
app.use("/comment",commentRoutes);
app.use("/sendmail",mailRoutes);
app.use("/merch",merchRoutes);
app.get("/sponsor",function(req, res) {
   res.render("./sponsor/sponsor_list.ejs"); 
});

app.get("*",function(req, res) {            // default route
    res.send("Work in progress");
});



//the listener functions that is used to establish the connection
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!!");
});

function getDateTime() {

    var d = new Date();
    var utc = d.getTime() - (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    var date = new Date(utc + (3600000*0));
    
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

