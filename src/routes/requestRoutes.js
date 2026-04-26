const ConnectionRequest = require("../models/connectionRequest");
const express = require("express");
const sendConnectionRouter = express.Router(); 
const {userAuth} = require("../utility/auth");
const User = require("../models/user");

sendConnectionRouter.post("/request/send/:status/:toUserId", userAuth, async(req,res) => {
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedConnections = ["ignored","interested"];
        if(!allowedConnections.includes(status)){
            return res.status(400).json({message:"Invalid Status Type!" + status});
        }

        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({message: "User not found!"});
        }

        if(fromUserId.toString() === toUserId){
            return res.status(400).json({ message: "Cannot send request to yourself" });
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserId,toUserId},
                {fromUserId:toUserId, toUserId:fromUserId}]
        });

        if(existingConnectionRequest){
            return res.status(400).json({message:"Connection request already exist!"})
        }


        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();
        res.json({
            message:"Connection Request : " + status + ". Updated between " + req.user.firstName +" and " + toUser.firstName,
            data
        })

    }catch(err){
        res.status(400).send("Error: " + err.message);
    }
})

sendConnectionRouter.post("/request/review/:status/:requestId",
    userAuth,
    async(req,res) => {
        try{
            const loggedInUser = req.user;
            const requestId = req.params.requestId;
            const status = req.params.status;
            const allowedStatus = ["accepted","ignored"];
            if(!allowedStatus.includes(status)){
                return res.status(400).json({message:"Invalid status type!"});
            }
            const connectionRequest = await ConnectionRequest.findOne({
                _id: requestId,
                toUserId: loggedInUser._id,
                status: "interested"
            });
            if(!connectionRequest){
                return res.status(404).json({message:"Cannot find connection request!"})
            }
            connectionRequest.status = status;
            const data = await connectionRequest.save();
            res.json({message: "Connection request updated to: " + status, data});

        }catch(err){
            res.status(400).send("Error : " + err.message);
        }
       

})

module.exports = sendConnectionRouter;