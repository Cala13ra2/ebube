


const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({

    name: {type: String, require: true, lowercase: true},
    email: {type: String, require: true, unique: true},
    dept: {type: String, require},
    location: {type: String},
    password: {type: String, require: true},
    refreshToken: {type: String }

}, { timestamps: true})


const Students = mongoose.model("Students", studentSchema)


module.exports = Students