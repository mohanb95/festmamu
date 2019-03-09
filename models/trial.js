var mongoose = require("mongoose");

var trialSchema = mongoose.Schema({
    views   : Number,
    time    : String,
    KS      : String,
});

module.exports = mongoose.model("trial", trialSchema);