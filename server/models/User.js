const mongoose = require("mongoose");
const Mschema = mongoose.Schema;



const userSchema =  Mschema({
    name:String,
    age:Number,
    profession:String
})

module.exports = mongoose.model("User",userSchema);