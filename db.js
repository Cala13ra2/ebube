
const mongoose = require("mongoose")


const connectDB = async()=>{
    mongoose.set("strictQuery", true)
    await mongoose.connect(process.env.MONGODB_URL)
        .then(()=> console.log("MongoDB connected..."))
}



module.exports = connectDB