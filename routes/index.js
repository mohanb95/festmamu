var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var aSync = require('async');
var smtpTransport = require('nodemailer-smtp-transport');
var Stage                   = require("../models/depend/stage"),
Address                 = require("../models/contact"),
Comment                 = require("../models/comments"),
Costing                 = require("../models/costing");

//root route
router.get("/",function(req,res){          // the index page
    res.render("index");
});

router.get('/userlist',function(req, res) {
    User.find({},function(err, users) {
        if(err){
            console.log(err);
        }else{
            res.send(users);
        }
    });
});

router.get("/:username/changePassword",function(req,res){
   res.render("change_pass"); 
});

router.get("/forgotPassword",function(req,res){
   res.render("forgotPass"); 
});

router.get('/resetPass/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, 
  function(err, user) {
    if (err) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgotPassword');
    }
    res.render('resetPass',{currUser: user });
  });
});


// show register form
router.get("/register",function(req, res) {
    var allusers=[];
    User.find({},function(err,users){
        if(err)
        console.log(err);
        else
        {
            users.forEach(function(user){
                allusers.push(user);
                console.log(user);
                
            });
        }
        res.render("signup_form",{users:allusers});
        // console.log(allusers);
        
        // console.log(users);
    })
    
    // console.log(allusers);
    
    // User.remove({},function(err){
    //     if(err)
    //     console.log(err)
    // });
    // console.log(User.modelName);
    
    // User.find({},function(err,user){
    //     if(err)
    //     console.log(err)
    //     else
    //     console.log(user)
        
    // });
    
}); 


//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.FirstName,
        lastName: req.body.LastName
    });
    // console.log(newUser);
    
    // if(req.body.password==req.body.password1)
    // {
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("signup_form");
        }
        else{
        // console.log("new user added")
        passport.authenticate("local")(req, res, function(){
            var newContact={
                Address     : req.body.address,
                City          : req.body.city,
                State         : req.body.state,
                PinCode       : req.body.pin,
                Contact1      : req.body.phone,
                AddressOf   : user._id
            };
            Address.create(newContact,function(err,newAddress){
                if(err){
                    console.log(err);
                } 
                else{
                    console.log("New contact: "+newAddress);
                }
            });
           req.flash("success", "Welcome to Festmamu " + user.firstName);
           res.redirect("/"); 
          console.log("New user registered!");
        
        });
        };
    });
    // }
    // else
    // res.render("signup_form");
});

router.post("/:username/changePassword",function(req,res){
  
   var newPassword= req.body.pass;
   var confirmNewPassword= req.body.pass1;
   User.findOne({username: req.params.username},function(error,user){
       if(error){
           console.log(Error);
       }
       else{
           console.log("Before change: "+user);
           console.log("Password: "+req.body.pass);
          if(newPassword===confirmNewPassword){
               user.setPassword(newPassword, function(error){
                   if(error){
                        console.log(error);
                   }
                   else{
                       user.save(function(err){
                           if(err){
                               console.log("Error in saving: "+err);
                           }
                           else{
                               console.log("After change pass: "+user.password);
                           }
                       });
                //   res.status(200).json({message: 'password reset successful'});
                res.redirect("/");
                //   res.render("send_mail");
                   console.log("After change: "+user);
                       
                   }
                });
            } else {
                res.status(500).json({message: 'Passwords do not match!!'});
            }
       }
   
});
});

router.post("/forgotPassword",function(req,res,next){
    User.findOne({email: req.body.mailId},function(err,user){
        if(err){
            console.log(err);
        }
        else{
            if(user==null){
                console.log("User not registered!!");
                res.redirect("/forgotPassword");
                req.flash('error', 'No account with that email address exists.');
            }
            else{
                aSync.waterfall([
                    function(done) {
                        crypto.randomBytes(20, function(err, buf) {
                            var token = buf.toString('hex');
                            done(err, token);
                        });
                    },
                    function(token, done) {
                        user.resetPasswordToken = token;
                        user.resetPasswordExpires = Date.now() + 180000; // 3 min
                        user.save(function(err) {
                            done(err, token, user);
                        });
                    },
                    function(token, user, done) {
                        var emailId=req.body.mailId;
                        var transporter = nodemailer.createTransport("SMTP",{
                            service: 'Gmail',
                            auth: {
                                user: 'bkm.blore.c9@gmail.com', // Your email id
                                pass: 'cloudnine' // Your password
                            }
                        });
                        var text = 'Hello '+user.firstName+
                                    ',\n This is a mail from festmamu.\n '+
                                    ' Kindly click the following link to reset password!\n'+
                                    ' Link: https://festmamu-keithfranklin.c9users.io/'+
                                    'resetPass/'+token+
                                    '\n If you did not request this, please ignore this email'+
                                    'and your password will remain unchanged.\n';
                        var mailOptions = {
                            from: 'FESTMAMU <bkm.blore.c9@gmail.com>', // sender address
                            to: emailId, // list of receivers
                            subject: 'Password Reset Test', // Subject line
                            text: text //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
                        };
                        transporter.sendMail(mailOptions, function(error, info){
                            if(error){
                                console.log(error);
                        // res.json({yo: 'error'});
                            }
                            else{
                                console.log('Message sent: congo!!!!!');
                                res.json({message: 'Password change requested!! Check mail!'});
                                req.flash('success', 'Reset link sent to your mail!');
                        // res.json({yo: info.response});
                            };
                        });
                    }
                ], function(err) {
                    if (err) return next(err);
                    res.redirect('/forgotPass');
                });
            }
            // res.status(200).json({message: 'Password change requested!!'});
        }
    });
   
});

router.post('/resetPass/:token', function(req, res) {
  aSync.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, 
      function(err, user) {
        if (err) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }
        var newPassword=req.body.pass;
        var confirmNewPassword=req.body.pass1;
        if(newPassword===confirmNewPassword){
            user.setPassword(newPassword, function(error){
                if(error){
                        console.log(error);
                   }
                else{
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpires = undefined;
                    user.save(function(err){
                        done(err, user);
                    });
                }
            });
        } else {
                res.status(500).json({message: 'Passwords do not match!!'});
        }
      });
    },
    function(user, done) {
      var transporter = nodemailer.createTransport("SMTP",{
                            service: 'Gmail',
                            auth: {
                                user: 'bkm.blore.c9@gmail.com', // Your email id
                                pass: 'cloudnine' // Your password
                            }
                        });
      var mailOptions = {
        to: user.email,
        from: 'FESTMAMU <bkm.blore.c9@gmail.com>',
        subject: 'Your password has been changed',
        text: 'Hello ' +user.firstName+',\n'+
          ' This is a confirmation that the password for your account ' + 
          user.email + ' has just been changed.\n'
      };
      transporter.sendMail(mailOptions, function(err) {
          if(err){
              console.log(err);
              // res.json({yo: 'error'});
          }
          else{
                console.log('Message sent: congo!!!!!');
                // res.json({message: 'Password changed successfully!!'});
                res.redirect("/login");
                req.flash('success', 'Password changed successfully!');
                        // res.json({yo: info.response});
          };
      });
    }
  ], function(err) {
      if(err){
          console.log(err);
      }
      else{
            res.redirect('/');
      }
  });
});

//show login form
router.get("/login", function(req, res){
   res.render("login");
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect : "/",
        failureRedirect : '/login',
        failureFlash : 'Invalid username or password!'
    }), function(req, res){
});

// logout route
router.get("/logout",middleware.isLoggedIn, function(req, res){
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/");
});



module.exports = router;