var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var express = require("express");
var router = express.Router();

router.get("/",function(req,res){
    res.render("send_mail");
});

router.post("/",function(req,res){
    var emailId=req.body.emailId;
    var transporter = nodemailer.createTransport("SMTP",{
        service: 'Gmail',
        auth: {
            user: 'bkm.blore.c9@gmail.com', // Your email id
            pass: 'cloudnine' // Your password
        }
    });
    var text = 'Hello world from MKB.\n Link: https://festmamu-keithfranklin.c9users.io';
    var mailOptions = {
        from: 'bkm.blore.c9@gmail.com', // sender address
        to: 'keith30895@gmail.com,mbmithun@gmail.com,bkm.blore@gmail.com', // list of receivers
        subject: 'Email Test', // Subject line
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
            res.render("send_mail");
            // res.json({yo: info.response});
        };
    });
})

module.exports = router;