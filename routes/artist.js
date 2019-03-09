var express                 = require("express");
var router                  = express.Router();
var passport                = require("passport");
var User                    = require("../models/user");
var middleware              = require("../middleware");
var path                    = require('path');
var formidable              = require('formidable');
var fs                      = require('fs');
var artists                      = require("../models/artists_depend/artists");
var forEach = require('async-foreach').forEach,
aws = require('aws-sdk'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    multerS3 = require('multer-s3');
router.get("/",function(req, res) {
    artists.find({},function(err,all_artists){
        if(err){
            console.log(err);
        }
        else{
            // console.log(all_djs)
            res.render("./artist/artist_main",{allArtists:all_artists});
        }
    });
   
});
router.get("/ar",function(req, res) {
    artists.find({},function(err,all_artists){
        if(err){
            console.log(err);
        }
        else{
            // console.log(all_djs)
            res.send(all_artists);
        }
    });
   
});

// var page=null;
// DJ routes
router.get("/dj",function(req, res) {
    artists.find({},function(err,all_artists){
        if(err){
            console.log(err);
        }
        else{
            all_artists[all_artists.length]="#dj";
            res.render("./artist/artist_main",{allArtists:all_artists});
        }
    });
});

//middleware.isLoggedIn,
router.get("/dj/new",middleware.isLoggedIn,function(req,res){
    res.render("./artist/dj_form");
});

router.get("/dj/:id",function(req, res) {
    artists.findById(req.params.id).exec(function(err, djFound){
        if(err){
            console.log(err);
        } else {
            console.log(djFound);
            djFound.views++;
            djFound.save(function(err,ft){
               console.log("  "); 
            });
            res.render("./artist/dj_detail", {dj: djFound});
        }
    });
});

router.get('/test/:id',function(req, res) {
    artists.findById(req.params.id).exec(function(err, djFound){
        if(err){
            console.log(err);
        } else {
            console.log(djFound);
            djFound.views++;
            djFound.save(function(err,ft){
               console.log("  "); 
            });
            res.render('./artist/artist.6/artist_detail',{artist: djFound}) ;
        }
    });
   
});


var link1;
router.post("/dj/new",function(req,res){
    var newDJ={
        Type: "DJ",
         Aname      : req.body.name,
         StageName  : req.body.djname,
         TagLine    : req.body.tag,
         Year       : req.body.year,
         experience : req.body.exp,
         genre      : req.body.genre,
         Description: req.body.desc,
         price_per_hour: req.body.price,
         link       : req.body.link,
         image_link : req.body.uploadedfiles,
         profile    : req.body.profile_image,
         facebook   : req.body.fb_link,
         soundcloud : req.body.sc_link,
         youtube    : req.body.yt_link,
         author: {
                                id: req.user._id,
                                username: req.user.username
                        },
         views : 1
    };
    // ========================================================
        // req.body.uploadedfiles    --->   is for the links of images that are uploaded
        // add comment reference to dj 
        // add a image String in stage model
    // ========================================================
    
    artists.create(newDJ,function(err,newDj){
        if(err){
           res.render("./artist/dj_form.ejs");
        } 
        else{
                // newDj.save();
                // console.log("after create  "+newDj.image_link);
                console.log(newDj);
                link1="/artist/dj/"+newDj._id;
                // console.log(link);
                res.redirect(link1);
        }
       
    });
});
// ______________
// BAND ROUTES
// ______________
router.get("/band/new",middleware.isLoggedIn,function(req,res){
    res.render("./artist/band_form");
});

router.get("/band/:id",function(req, res) {
    artists.findById(req.params.id).exec(function(err, bandFound){
        if(err){
            console.log("Printing error")
            console.log(err);
        } else {
            console.log(bandFound);
            res.render("./artist/band_detail", {band: bandFound});
        }
    });
});

router.post("/band/new",middleware.isLoggedIn,function(req,res){
    console.log(req.body.uploadedfiles);
    var newBand={
        Type: "BAND",
         Aname      : req.body.name,
         StageName  : req.body.band_name,
         TagLine    : req.body.tag,
         Year       : req.body.year,
         experience : req.body.exp,
         genre      : req.body.genre,
         Description: req.body.desc,
         price_per_hour: req.body.price,
         link       : req.body.link,
         image_link : req.body.uploadedfiles,
         profile    : req.body.profile_image,
         facebook    : req.body.fb_link,
         soundcloud : req.body.sc_link,
         youtube    : req.body.yt_link,
         author: {
                                id: req.user._id,
                                username: req.user.username
                        },
         views : 1
    };
    // ========================================================
        // req.body.uploadedfiles    --->   is for the links of images that are uploaded
        // add comment reference to dj 
        // add a image String in stage model
    // ========================================================
    
    artists.create(newBand,function(err,new_band){
        if(err){
           res.render("./artist/band_form.ejs");
        } 
        else{
                // newDj.save();
                // console.log("after create  "+newDj.image_link);
                console.log(new_band);
                link1="/artist/test/"+new_band._id;
                // console.log(link);
                res.redirect(link1);
        }
       
    });
});

// ______________
// STAND UP ROUTES
// ______________
router.get("/standup/new",middleware.isLoggedIn,function(req,res){
    res.render("./artist/standup_form");
});

router.get("/standup/:id",function(req, res) {
    artists.findById(req.params.id).exec(function(err, standupFound){
        if(err){
            console.log(err);
        } else {
            console.log(standupFound);
            res.render("./artist/standup_detail", {standup: standupFound});
        }
    });
});

router.post("/standup/new",middleware.isLoggedIn,function(req,res){
    var newStandup={
        Type: "STAND_UP",
         Aname      : req.body.name,
         StageName  : req.body.standup_name,
         TagLine    : req.body.tag,
         Year       : req.body.year,
         experience : req.body.exp,
         genre      : req.body.genre,
         Description: req.body.desc,
         price_per_hour: req.body.price,
         link       : req.body.link,
         image_link : req.body.uploadedfiles,
         profile    : req.body.profile_image,
         facebook    : req.body.fb_link,
         soundcloud : req.body.sc_link,
         youtube    : req.body.yt_link,
         author: {
                                id: req.user._id,
                                username: req.user.username
                        },
         views : 1
    };
    // ========================================================
        // req.body.uploadedfiles    --->   is for the links of images that are uploaded
        // add comment reference to dj 
        // add a image String in stage model
    // ========================================================
    
    artists.create(newStandup,function(err,new_standup){
        if(err){
           res.render("./artist/standup_form.ejs");
        } 
        else{
                console.log(new_standup);
                link1="/artist/standup/"+new_standup._id;
                res.redirect(link1);
        }
       
    });
});
// ______________
// HEADLINER ROUTES
// ______________
router.get("/headliner/new",middleware.isLoggedIn,function(req,res){
    res.render("./artist/headliner_form");
});

router.get("/headliner/:id",function(req, res) {
    artists.findById(req.params.id).exec(function(err, headFound){
        if(err){
            console.log(err);
        } else {
            console.log(headFound);
            res.render("./artist/headliner_detail", {headliner: headFound});
        }
    });
});

router.post("/headliner/new",middleware.isLoggedIn,function(req,res){
    var newHead={
        Type: "HEADLINER",
         Aname      : req.body.name,
         StageName  : req.body.head_name,
         TagLine    : req.body.tag,
         Year       : req.body.year,
         experience : req.body.exp,
         genre      : null,
         Description: req.body.desc,
         price_per_hour: req.body.price,
         link       : req.body.link,
         image_link : req.body.uploadedfiles,
         profile    : req.body.profile_image,
         facebook    : req.body.fb_link,
         soundcloud : req.body.sc_link,
         youtube    : req.body.yt_link,
         author: {
                                id: req.user._id,
                                username: req.user.username
                        },
         views : 1
    };
    // ========================================================
        // req.body.uploadedfiles    --->   is for the links of images that are uploaded
        // add comment reference to dj 
        // add a image String in stage model
    // ========================================================
    
    artists.create(newHead,function(err,new_head){
        if(err){
           res.render("./artist/headliner_form.ejs");
        } 
        else{
                console.log(new_head);
                link1="/artist/headliner/"+new_head._id;
                res.redirect(link1);
        }
       
    });
});

// router.post("/newfile",function(req,res){
//  var form = new formidable.IncomingForm();
//  var fileName=[];
//   // specify that we want to allow the user to upload multiple files in a single request
//   form.multiples = true;

//   // store all uploads in the /uploads directory
//   form.uploadDir = path.join(__dirname, '../public/images');
  
//   // every time a file has been uploaded successfully,
//   // rename it to it's orignal name
//   form.on('file', function(field, file) {
//       console.log(file.path);
//     fs.rename(file.path, file.path+".jpg");
    
//     fileName.push(file.path);
//   });

//   // log any errors that occur
//   form.on('error', function(err) {
//     console.log('An error has occured: \n' + err);
//   });

//   // once all the files have been uploaded, send a response to the client
//   form.on('end', function() {
//     //   console.log(fileName);
//     res.send(fileName);
//   });

//   // parse the incoming request containing the form data
//   form.parse(req);

// });







aws.config.update({
    secretAccessKey: 'XFCnDSXT6aAYJ8koP/NezEuCyLjgtMep06jvhMvw',
    accessKeyId: 'AKIAI7JO7LFODBV77ESQ',
    region: 'us-west-2'
});

var app = express(),
    s3 = new aws.S3();

app.use(bodyParser.json());
var filesup=[];
var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'festmamu',
        key: function (req, file, cb) {
            console.log(file);
            name=Date.now()+file.originalname;
            filesup.push(name);
            cb(null, name); //use Date.now() for unique file keys
        }
    })
});



//used by upload form
router.post('/upload', upload.array('images'), function (req, res, next) {
    res.send(filesup);
    
});




module.exports = router;