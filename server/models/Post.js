const mongoose = require("mongoose");
const Mschema = mongoose.Schema;


const postSchema = Mschema({
    comment:String,
    userId:String
});

module.exports = mongoose.model("Post",postSchema);
