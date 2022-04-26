const mongoose = require("mongoose");
const Mschema = mongoose.Schema;


const hobbeySchema = Mschema({
    title:String,
    description:String,
    userId:String
})


module.exports = mongoose.model("Hobby",hobbeySchema);