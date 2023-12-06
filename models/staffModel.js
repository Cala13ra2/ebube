
const mongoose = require("mongoose")

const staffSchema = new mongoose.Schema({

    name: {type: String, require: true, lowercase: true},
    email: {type: String, require: true, unique: true},
    dept: {type: String, require},
    location: {type: String},

    

}, { timestamps: true})


const Staff = mongoose.model("Staff", staffSchema)


module.exports = Staff