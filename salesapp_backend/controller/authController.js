const { hashPassword, comparePassword } = require("../helper/authHelper")
const userModel = require("../model/userModel")
const JWT = require("jsonwebtoken")

//register controller
const registerColtrollerRoutes = async (req,res)=>{
    try {
        const {firstname ,lastname, email , password , answer  }= req.body
        //validation
        if(!firstname  || !email || !password ||!answer ){
            return res.status(400).json({message:"one or more mandatory fields are empty"})
        }
        //check user
        const existingUser = await userModel.findOne({email})
        //existing user
        if(existingUser){
            res.status(200).send({
                success:true,
                message:"Already register please Login"
            })
        }
        //register user
        const hashedpassword = await hashPassword(password)
        //save
        const user = new userModel({firstname,lastname,email,answer,password: hashedpassword}).save()
        res.status(200).send({
            success:true,
            message:"Register Successfull",
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message :"something went wrong while register"
        })
    }
}

//login controller
const loginColtrollerRoutes = async (req,res)=>{
    try {
       const {email,password}= req.body
       //validation
       if(!email || !password){
        return res.status(404).send({
            success:false,
            message:"invalid email or password"
        })
       } 
       //check user
       const user = await userModel.findOne({email})
       if(!user){
        return res.status(404).send({
            success:false,
            message:"email not registerd"
        })
       }
       //match user
       const match = await comparePassword(password,user.password)
       //not match password
       if(!match){
         return res.status(200).send({
            success:false,
            message:"invalid password"
        })
       }
       //JWT token
       const token = await JWT.sign({_id:user._id},process.env.JWT_SECERT,{expiresIn:"7d"})
       //match password
       res.status(200).send({
        success:true,
        message:"Logged in Successfull",
        user:{
            firstname:user.firstname,
            lastname:user.lastname,
            email:user.email,
            password:user.password,
            answer:user.answer,
            
        },
        token
       })
    } catch (error) {
       console.log(error)
       res.status(500).send({
        success:false,
        message:"Something went wrong while login",
        error
       }) 
    }
}
 

//forgot password controller

const forgotPasswordController = async (req,res)=>{
try {
    const {email,answer,newPassword} = req.body
    //validation
    if(!email){
        res.status(400).send({
            success:false,
            message:"email is required"
        }) 
    }
    if(!newPassword){
        res.status(400).send({
            success:false,
            message:"newPassward is required"
        }) 
    }
    if(!answer){
        res.status(400).send({
            success:false,
            message:"answer is required"
        })  
    }
    //check user
    const user = await userModel.findOne({email,answer})
    //validation
    if(!user){
        res.status(400).send({
            success:false,
            message:"Wrong Email or Answer",
        })
    }
    const hashed = await hashPassword(newPassword)
    await userModel.findByIdAndUpdate(user._id,{password:hashed})
    res.status(200).send({
        success:true,
        message:"Password Reset Successfull"
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error Something while forget password",
        error,
    })
}
}

module.exports = {registerColtrollerRoutes,loginColtrollerRoutes,forgotPasswordController}