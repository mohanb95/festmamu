var mongoose = require("mongoose");
var commentSchema = mongoose.Schema({
    text    : String,
    author  : 
    {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    likes   : Number,
    dislikes: Number,
    rating  : Number,
    time    : String
});

module.exports = mongoose.model("Comment", commentSchema);