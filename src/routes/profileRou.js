const express = require("express");
const {userAuth} = require("../utility/auth");
const validateEditProfileData = require("../utility/validation");
const profileRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");


profileRouter.get("/profile/view", userAuth, async(req,res) => {
    try{
        const user = req.user;
        res.send(user);
    }catch (err){
        res.status(400).send("Cannot Get Profile:" + err.message);
    }

})

profileRouter.patch("/profile/edit", userAuth, async(req,res) => {
    
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request!")
        }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.send(`${loggedInUser.firstName}, your profile has been successfully updated!`)    
    }catch (err){
        res.status(400).send("Unable to update :" + err.message);
    }
})


profileRouter.patch("/profile/updatePassword", userAuth, async(req,res) => {
    try{
    const {oldPassword,password} = req.body;
    const user = req.user;
    const validPassword = await user.validatePass(oldPassword);
    if(validPassword){
        
        if(!validator.isStrongPassword(password)){
            throw new Error("Enter a strong password");
        }
                        
        const passwordHash = await bcrypt.hash(password,10);
        await User.findOneAndUpdate({_id:user._id},{password:passwordHash},{runValidators: true});
        res.send(`${user.firstName}, your password has been successfully updated!`);    
    }
    else{
        throw new Error("Old Password is incorrect!");
    }
}catch(err){
     res.status(400).send("Unable to update :" + err.message);
}
})


module.exports = profileRouter;
//$2b$10$GcVALci1242vagpduScSdeHbP/Ylh4XeVwWzfH/AZ1DnBuqbbfLpe