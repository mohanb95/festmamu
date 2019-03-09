var mongoose = require("mongoose");
var costSchema = new mongoose.Schema({ 
    Package: String,
    Cost: Number,
    CostingOf: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Stage"
        }]
});
module.exports = mongoose.model("Costing",costSchema);