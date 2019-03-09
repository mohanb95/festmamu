var express                 = require("express");
var router                  = express.Router();
var passport                = require("passport");
var User                    = require("../models/user");
var middleware              = require("../middleware");
var Stage                   = require("../models/depend/stage"),
Address                 = require("../models/contact"),
Comment                 = require("../models/comments"),
Costing                 = require("../models/costing");




router.get("/",function(req, res) {           // the stage lists
   Stage.find({})
   .populate("Location")
  .populate("cost")
  .exec(function(err,stageFound){
       if(err){
           console.log("error occured");
       }
       else{
        //   console.log(stageFound);
           res.render("stage/stage_list",{stage: stageFound}); 
           
       }
   });       
});

router.get("/list", function(req, res) {
     Stage.find({})
   .populate("Location")
  .populate("cost")
  .exec(function(err,stageFound){
       if(err){
           console.log("error occured");
       }
       else{
        //   console.log(stageFound);
           res.send({stage: stageFound}); 
           
       }
   }); 
});

router.get("/new",middleware.isLoggedIn,function(req, res) {       // the stage details entery
   res.render("./stage/stage_form");
});

router.get("/:id", function(req, res) {
  Stage.findById(req.params.id)
  .populate("Location")
  .populate("cost")
//   .populate("Comments")
//   .populate("author")
   .exec(
      function(err, stageFound){
        if(err){
            console.log(err);
        } else {
            console.log(stageFound);
            stageFound.views= stageFound.views + 1;
            stageFound.save(function(err,st){
                console.log(st.views+" here!!!!");
            });
            // console.log(stageFound);
            res.render("stage/stage_info.ejs", {stage: stageFound});
        }
    });
});

router.get("/:id/mylistings",middleware.isLoggedIn,function(req,res){          // the index page
    console.log(req.user._id);
    Stage.find({'author.id' : req.user._id})
   .populate("Location")
  .populate("cost")
  .exec(function(err,stageFound){
       if(err){
           console.log("error occured");
       }
       else{
          console.log("In my list: ",stageFound);
           res.send({stages: stageFound}); 
           
       }
   }); 
});
router.post("/new",middleware.isLoggedIn,function(req,res){            // the entery to the database
    // stagein(req,res);
    // req.body.stage=req.sanitize(req.body.stage);
    // req.body.Address=req.sanitize(req.body.Address);
    req.body.street1=req.sanitize(req.body.street1);
    req.body.street2=req.sanitize(req.body.street2);
    req.body.contact1=req.sanitize(req.body.contact1);
    req.body.contact2=req.sanitize(req.body.contact2);
    
    var newContact={
        Add_Line1     : req.body.street1,
        Add_Line2     : req.body.street2,
        City          : req.body.city,
        State         : req.body.state,
        PinCode       : req.body.zip,
        Contact1      : req.body.contact1,
        Contact2      : req.body.contact2
    }
    var newCosting = {
        Package       : req.body.CostPackage,
        Cost: req.body.cost
    }
    // req.body.Descrip.body=req.sanitize(req.body.Descrip.body);
    // var formDataDes=req.body.descrip;
    Address.create(newContact,function(err,newAddress){
       console.log(newAddress);          
       if(err){
           res.render("./stage/stage_form.ejs");
       } 
       else{
                newAddress.save();
                Costing.create(newCosting,function(err,newCost){
              if(err){
                  res.render("./stage/new_stage.ejs");
              }
              else{
                  newCost.save();
                  var newStageDet={
                        Comp_Name     : req.body.Cname,
                        des_dimensions: req.body.dimensions,
                        des_types     : req.body.types,
                        views : 1,
                        author: {
                                id: req.user._id,
                                username: req.user.username
                        },
                        Location: newAddress._id,
                        cost: newCost._id
                    };
                  Stage.create(newStageDet,function(err,newStage){
                      if(err)
                      console.log(err);
                      else{
                          console.log("New stage added");
                          console.log(newStage);
                          res.redirect("/stage");
                      }
                      
                  });
              }
                });
       }
    });
            
           
        //     Comment.create(req.body.comment, function(err, comment){
        //   if(err){
        //       console.log(err);
        //   } else {
        //       campground.comments.push(comment);
        //       campground.save();
        //       res.redirect('/campgrounds/' + campground._id);
        //   }
        // });
        
      
           
       
});


module.exports = router;