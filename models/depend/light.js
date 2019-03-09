var mongoose        = require("mongoose");

var lightSchema =   new mongoose.Schema({
    cname       :   String,
    descrip     :   String,
    location    :   [{
        id      :   [{
            type    :   mongoose.Schema.Type.ObjectId,
            ref     :   "Contact"
        }]
    }],
    costing     :   [{
            type    :   mongoose.Schema.Type.ObjectId,
            ref     :   "Costing"
    }],
    comments    :   [{
            type    :   mongoose.Schema.Type.ObjectId,
            ref     :   "Comment"
    }],
    author      :   [{
        id      :   [{
            type    :   mongoose.Schema.Type.ObjectId,
            ref     :   "User"
        }]
    }]
});

mongoose.exports    = mongoose.models("Light",lightSchema);