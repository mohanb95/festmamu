var mongoose        = require("mongoose");
var ArtistsSchema    = new mongoose.Schema({
    Type                :   String,
    Aname               :   String,
    StageName           :   String,
    TagLine             :   String,
    Year                :   Number,
    experience          :   String,
    genre               :   [String],
    Description         :   String,
    price_per_hour      :   Number,
    link                :   String,
    Comments            :   [{
            type        :   mongoose.Schema.Types.ObjectId,
            ref         :   "Comment"
    }],
    image_link          :   String,
    views               :   Number,
    profile             :   String,
    facebook            :   String,
    soundcloud          :   String,
    youtube             :   String,
    author              :    {
                        id:{
                            type    :   mongoose.Schema.Types.ObjectId,
                            ref     :   "User"
                        }
    }
});

module.exports      =   mongoose.model("Artist",ArtistsSchema);