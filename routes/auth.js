var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");


// show register form
router.get("/register",middleware.notLoggedIn,function(req, res) {
    res.render("signup_form");
    // User.remove({},function(err){
    //     if(err)
    //     console.log(err)
    // });
    User.find({},function(err,user){
        if(err)
        console.log(err)
        else
        console.log(user)
        
    });
    
}); 


//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    // if(req.body.password==req.body.password1)
    // {
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("signup_form");
        }
        console.log("new user added")
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to Festmamu " + user.username);
           res.redirect("back"); 
           console.log("new user added message 1")
        });
    });
    // }
    // else
    // res.render("signup_form");
});

//show login form
router.get("/login",middleware.notLoggedIn, function(req, res){
   res.render("login");
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        
        successRedirect: "",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout",middleware.isLoggedIn, function(req, res){
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/");
});


module.exports = router;
