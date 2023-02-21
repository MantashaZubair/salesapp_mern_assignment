const express = require("express")
const { createSalesController,getSalesController,deleteSalesController} = require("../controller/salesController")
const {requireSignIn} = require("../middleware/authmiddleware")
const router= express.Router()

//routes

//create sales route
router.post("/createsales",requireSignIn, createSalesController)

//get sales route
router.get("/getsales",requireSignIn,getSalesController)

//delete sales route
router.delete("/deletesales/:sid", requireSignIn,deleteSalesController)

module.exports= router