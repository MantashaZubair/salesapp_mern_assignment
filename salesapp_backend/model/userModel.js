const mongoose = require("mongoose")

const userModel = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname: {
        type:String,
       },
     email: {
        type:String,
        required:true,
        unique:true
       },
       password: {
        type:String,
        required:true,
       },
       role:{
          type:Number,
          default:0
       }

},{timestamps:true})
module.exports= mongoose.model("users", userModel)