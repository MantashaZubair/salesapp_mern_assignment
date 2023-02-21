const salesModel = require("../model/salesModel")

//create product sales Controller
const  createSalesController = async(req,res)=>{
    try {
        const {product,quantity,amount}=req.body
        //validation
        if(!product || !quantity || !amount){
            return res.status(400).json({message:"one or more mandatory fields are empty"})
        }
        //save
        const salesentry = await new salesModel({user:req.user._id,product,quantity,amount}).save()
        res.status(200).send({
            success:true,
            message:"Add Sales Entry Successfull",
            salesentry,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while creating sales product",
            error
        })
    }
}

//get sales controller
 const getSalesController = async (req,res)=>{
    try {
       const salesentry = await salesModel.find({user:req.user._id}).limit(5)
       res.status(200).send({
        success:true,
        message:"getting salesEntry successfull",
        salesentry,
       })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error something while getting salses Controllers",
            error,
        })
    }
 }

 //delete sales Controller
 const deleteSalesController = async(req,res)=>{
    try {
        await salesModel.findByIdAndDelete(req.params.sid)
        res.status(200).send({
            success:true,
            message:"sales deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error something while deleting sales",
            error,
        })
    }
 }

module.exports= {createSalesController,getSalesController, deleteSalesController}