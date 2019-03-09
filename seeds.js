var mongoose = require("mongoose");
var Stage                   = require("./models/depend/stage"),
Address                 = require("./models/contact"),
// Comment                 = require("./models/comments"),
Costing                 = require("./models/costing"),
Comments                = require("./models/comments"),
Users                   = require("./models/user"),
Artist                  = require("./models/artists_depend/artists");

var unreg = {
     username: "unregistered user",
        email: "unreg@is.tered",
        firstName: "unreg",
        lastName: "istered"
};

function seedDB(){
    Users.remove({},function(err) {
        if(err){
            console.log(err);
        }
        else{
            console.log("users removed");
        }
    });
    Comments.remove({},function(err){
        console.log(err);
    });
  Stage.remove({}, function(err){
        if(err){
            console.log(err);
        }
        else{
        console.log("Removed stages!");
        Address.remove({}, function(err){
        if(err){
            console.log(err);
        }
        else{
        console.log("Removed Address!");
        Costing.remove({}, function(err){
        if(err){
            console.log(err);
        }
        else
        console.log("Removed Costing!");
        });
        }
        });
        }
  });
    Artist.remove({},function(err) {
       if(err){
           console.log(err);
       }else
       console.log("removed artist");
    });
// User.register(unreg,"qweasdzx",function(err,user){
//     if(err)
//         console.log(err);
//     else
//         console.log(user);
// }); 
}

         
module.exports = seedDB;