var mongoose    =   require("mongoose");

var stageSchema =   new mongoose.Schema({
    Comp_Name       :   String,
    Cost     :   String,
    Add_Line1    :   String,
    Add_Line2    :   String,
    City: String,
    State: String,
    Contact1: Number,
    Contact2:Number,
    des_dimensions: String,
    des_types: String
});

module.exports    = mongoose.model("details",stageSchema);
    