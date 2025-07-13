
const shortid = require("shortid");
const URL=require("../models/url");
const express=require("express"); 
const router=express.Router();


router.get("/", async (req,res)=>{
    const allurls=await URL.find({});
    return res.render("home", { urls: allurls, shortid: null });
})


router.get("/signup",(req,res)=>{
    return res.render("signup",{shortid:null});
})

router.get("/login",(req,res)=>{
    return res.render("login",{shortid:null});
})

module.exports=router;