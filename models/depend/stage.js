var mongoose    =   require("mongoose");

var stageSchema =   new mongoose.Schema({
    Comp_Name       :   String,
    des_dimensions  : String,
    des_types       : String,
    Location        :      {
            type    :   mongoose.Schema.Types.ObjectId,
            ref     :   "Contact"
    },
    cost            :    {
            type    :   mongoose.Schema.Types.ObjectId,
            ref     :   "Costing"
    },
    Comments        :   [{
            type    :   mongoose.Schema.Types.ObjectId,
            ref     :   "Comment"
    }],
    author          :    {
        id:{
            type    :   mongoose.Schema.Types.ObjectId,
            ref     :   "User"
        },
    trial           :   {
        type        :   mongoose.Schema.Types.ObjectId,
        ref         :   "trial"
    },
        username    : String,
        time        : String,
        images      : String,
    },
    views       : Number
});

module.exports    = mongoose.model("Stage",stageSchema);