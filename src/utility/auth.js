const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async(req,res,next) => {
    try{
        //read the jwt token from the cookie
        const {token} = req.cookies;
        if(!token){
            throw new Error("Invalid Token");
        }

        //validate the token
        const decodedData = await jwt.verify(token,"DEVtinder@10");

        //find the user
        const {_id} = decodedData;
        const user = await User.findById({_id});
        if(!user){
            throw new Error("User not found!");
        }
        req.user = user;
        next();
    }catch{
        res.status(400).send("ERROR : "  + err.message);
    }
    
}

module.exports = {userAuth};