const express = require("express");
const { userAuth } = require("../utility/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async(req,res) => {
    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", "firstName lastName gender about skills photoUrl");
        if(!connectionRequests){
            return res.json({message: "0 requests received"})
        }
        res.json({message: "Requests fetched successfully!" ,
            data: connectionRequests
        });

    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})
userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" }
            ]
        })
        .populate("fromUserId", "firstName lastName gender about skills photoUrl")
        .populate("toUserId", "firstName lastName gender about skills photoUrl");

        const data = connectionRequests.map((row) => {
            if (row.fromUserId._id.equals(loggedInUser._id)) {
                return row.toUserId;
            }
            return row.fromUserId;
        });

        const uniqueData = Array.from(
            new Map(data.map(user => [user._id.toString(), user])).values()
        );

        res.json({
            message: "Connections fetched successfully",
            data: uniqueData
        });

    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

userRouter.get("/user/feed", userAuth, async(req,res) => {
    try{
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1 ;
        let limit = parseInt(req.query.limit) || 10 ;
        limit = limit>50 ? 50 : limit;
        const skip =  (page -1) * limit;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id}
            ]
        }).select("fromUserId  toUserId");

        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId);
            hideUsersFromFeed.add(req.toUserId);
        })

        const feed = await User.find({
            $and: [
            {_id: { $nin: Array.from(hideUsersFromFeed)}},
            { _id: {$nin : loggedInUser._id}}
        ]
        })
        .select("firstName lastName gender about skills photoUrl")
        .skip(skip)
        .limit(limit);

        res.json({data: feed});

    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})

module.exports = userRouter;