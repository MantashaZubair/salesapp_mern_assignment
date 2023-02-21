const mongoose = require("mongoose")

const salesModel = new mongoose.Schema({
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'users'
    },
    product: {
        type:String,
        required:true,
    },
    quantity:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }

})
module.exports = mongoose.model("sales" ,salesModel)