const express = require("express")
const { registerColtrollerRoutes ,loginColtrollerRoutes,forgotPasswordController} = require("../controller/authController")
const { requireSignIn} = require("../middleware/authmiddleware")
const router = express.Router()

//routes

//register routes
router.post("/register" , registerColtrollerRoutes)

//login routes
router.post("/login" , loginColtrollerRoutes)

//forgot Password
router.post("/forgotPassword", forgotPasswordController)

//protected user route auth
router.get('/user-auth', requireSignIn , (req,res)=>{
    res.status(200).send({ok:true})
})

module.exports = router
