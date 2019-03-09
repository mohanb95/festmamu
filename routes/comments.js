var express                 = require("express");
var router                  = express.Router();
var passport                = require("passport");
var forEach                 = require('async-foreach').forEach;
var User                    = require("../models/user");
var middleware              = require("../middleware");
var Stage                   = require("../models/depend/stage"),
Comment                     = require("../models/comments"),
Artist                      = require("../models/artists_depend/artists");
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

router.get("/stage/:id",function(req,res){
  console.log(req.params.id);
   Stage.findById(req.params.id).populate({
       path: 'Comments', 
       model: 'Comment',
       populate:{
           path: 'author', 
            model: 'User',
       }
   }).exec(function(err, stageFound) {
      if(err){
          console.log(err);
      }else{
          console.log(stageFound.Comments);
          console.log(getDateTime());
          res.send(stageFound.Comments);
      }
   });
//   res.send(comms);
});


router.get("/artist/:id",function(req,res){
   console.log("here"+req.params.id);
   Artist.findById(req.params.id).populate({
       path: 'Comments', 
       model: 'Comment',
       populate:{
           path: 'author', 
            model: 'User',
       }
   }).exec(function(err, ArtistsFound) {
      if(err){
          console.log(err);
      }else{
        //   console.log(ArtistsFound);
          res.send(ArtistsFound.Comments);
      }
   });
//   res.send(comms);
});

router.post("/stage/new",function(req,res){
    req.body.rating = req.sanitize(req.body.rating);
    req.body.comment= req.sanitize(req.body.comment);
    req.body.refId=req.sanitize(req.body.refId);
    
    if(req.body.userId=="5916cfa7df2fbb0f80e7361b")//58823840a8d54500114888fa
    {
        // console.log(req.body.userId);
        req.body.userId="5916cfa7df2fbb0f80e7361b";//58823840a8d54500114888fa
    }
    else{
        // delete req.body.userId;
       req.body.userId = req.user._id;
        
    
    }
    
    var newComment = {
      text      :   req.body.comment,
      author    :   req.body.userId,
      rating    :   req.body.rating,
      time      :   getDateTime()
    };
    Stage.findById(req.body.refId,function(err,stageFound){
       if(err)
            console.log(err);
        else{
            console.log(stageFound);
            Comment.create(newComment,function(err,newComm){
                if(err){
                    console.log("here!    "+err);
                }else{
                    // newComm.save();
                    stageFound.Comments.push(newComm);
                    stageFound.save();
                    console.log(newComm);
                    res.send("success");
                }
            });
        }
    });
    
});
router.post("/artist/new",function(req,res){
    req.body.rating = req.sanitize(req.body.rating);
    req.body.comment= req.sanitize(req.body.comment);
    req.body.refId=req.sanitize(req.body.refId);
    
    if(req.body.userId=="5916cfa7df2fbb0f80e7361b")//58823840a8d54500114888fa-public
    {
        // console.log(req.body.userId);
        req.body.userId="5916cfa7df2fbb0f80e7361b";//58823840a8d54500114888fa
    }
    else{
        // delete req.body.userId;
       req.body.userId = req.user._id;
        
    
    }
    // console.log(req.body.rating);
    // console.log(req.body.comment);
    // console.log(req.body.refId);
    var newComment = {
      text      :   req.body.comment,
      author    :   req.body.userId,
      rating    :   req.body.rating,
      time      :   getDateTime()
    };
    Artist.findById(req.body.refId,function(err,ArtistFound){
       if(err)
            console.log(err);
        else{
            Comment.create(newComment,function(err,newComm){
                if(err){
                    console.log(err);
                }else{
                    newComm.save();
                    ArtistFound.Comments.push(newComm);
                    ArtistFound.save();
                    console.log(newComm);
                    res.send("success");
                }
            });
        }
    });
    
});
router.post("/artist/new/ext",function(req,res){
    console.log(req.body);
    req.body.rating = req.sanitize(req.body.rating);
    req.body.comment= req.sanitize(req.body.comment);
    req.body.refId=req.sanitize(req.body.refId);
    
    // if(req.body.userId=="588227e1ab46ec12c1c41bf6")//58823840a8d54500114888fa-public
    // {
    //     // console.log(req.body.userId);
    //     req.body.userId="588227e1ab46ec12c1c41bf6";//58823840a8d54500114888fa
    // }
    // else{
    //     // delete req.body.userId;
    //   req.body.userId = req.user._id;
        
    
    // }
    // console.log(req.body.rating);
    // console.log(req.body.comment);
    console.log(req.body.refId);
    
    var newComment = {
      text      :   req.body.comment,
      author    :   req.body.userId,
      rating    :   req.body.rating,
      time      :   getDateTime()
    };
    Artist.findById(req.body.refId,function(err,ArtistFound){
       if(err)
            console.log(err);
        else{
            Comment.create(newComment,function(err,newComm){
                if(err){
                    console.log(err);
                }else{
                    newComm.save();
                    ArtistFound.Comments.push(newComm);
                    ArtistFound.save();
                    console.log(newComm);
                    res.send("success");
                }
            });
        }
    });
    
});

module.exports = router;