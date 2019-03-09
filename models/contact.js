var mongoose        = require("mongoose");

var contactSchema   = new mongoose.Schema({
    Address    :   String,
    // Add_Line2    :   String,
    City: String,
    State: String,
    PinCode: Number,
    Contact1: Number,
    // Contact2:Number,
    AddressOf: {
            type    :   mongoose.Schema.Types.ObjectId,
            ref     :   "User"
        }
});

module.exports    = mongoose.model("Contact",contactSchema);