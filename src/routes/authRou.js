const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");


authRouter.post("/signUp", async(req,res) => {

    try{
        const {firstName,lastName,emailId,password} = req.body;
        //encrypt password
        const passwordHash = await bcrypt.hash(password,10);
        
        const user = new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash
        });
        
        await user.save();
        
        res.send("New User added successfully");
    }
     catch (err){
        res.status(400).send("Cannot Add user :" + err.message);
    }
   
})


authRouter.post("/login", async(req,res) =>{

    try{
        const {emailId,password} = req.body;
        const user = await User.findOne({emailId:emailId})
        if(!user){
            throw new Error("EmailID not found!");
        }

        const validPassword = await user.validatePass(password);
        if(validPassword){
            //create a JWT token
            const token = await user.getJWT();

            //add jwt token to cookie and send the response back to the user
            res.cookie("token",token);
            res.send("Logged in Successfully");
        }
        else{
            throw new Error("Incorrect Password");
        }



    }catch (err){
        res.status(400).send("Login Unsuccessfull :" + err.message);
    }

})

authRouter.post("/logout", async(req,res) => {
    res.cookie("token", null , {expires: new Date(Date.now())});
    res.send("Logged Out Successfully");
})
module.exports = authRouter;