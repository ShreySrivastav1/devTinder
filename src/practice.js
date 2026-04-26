const express = require("express");
const practice = express();

const { isAuthenticated, isAdmin } = require("./utility/isAuth");

practice.get("/public",(req,res) => {
    res.send("Public data sent");
})

practice.get("/profile", isAuthenticated, (req,res) => {
    res.send("User data sent");
})

practice.post("/admin/createUser", isAdmin, (req,res) => {
    res.send("Created user");
})

practice.listen(7777 , () => {
    console.log("Server running on port 7777");
})



/*
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);
    const fetchConnections = async() => {
        try{
            const res = await axios.get(BASE_URL + "/user/connections", { 
                withCredentials: true
            });
            dispatch(addConnections(res.data.data));
        }catch(err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchConnections();
    },[]);
    return(
    <div className="flex flex-col items-center my-10">
        <h1 className="font-bold text-2xl mb-4">Connections</h1>
        {connections.length === 0 ? (
            <p>No connections yet</p>
        ):(connections.map((connection) => (
        <div key={connection._id}>
          {connection.firstName}
        </div>
      ))
    )}
  </div>
);
}

export default Connections;

//signUp API
app.post("/signUp", async(req,res) => {

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

//login API
app.post("/login", async(req,res) =>{

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

//profile API
app.get("/profile", userAuth, async(req,res) => {
    try{
        const user = req.user;
        res.send(user);
    }catch (err){
        res.status(400).send("Cannot Get Profile:" + err.message);
    }

})

//get FEED
app.get("/feed",async(req,res) => {
    
    try{
    const users = await User.find({})
    if (users.length ===  0){
        res.status(404).send("Empty feed!!");
    }
    else{
         res.send(users);
        }
   
        
    }catch (err){
        res.status(400).send("something went wrong!");
    }
   
})

//get user by email emailId:req.body.emailId
app.get("/user",async(req,res) => {
    
    try{
    const users = await User.find({emailId:req.body.emailId})
    if (users.length ===  0){
        res.status(404).send("No match found");
    }
    else{
         res.send(users);
        }
   
        
    }catch (err){
        res.status(400).send("something went wrong!");
    }
   
})

//delete user by _id
app.delete("/user",async(req,res) => {
    try{
         await User.findByIdAndDelete({_id: req.body._id})
         res.send("User deleted successfully");
        }catch (err){
            res.status(400).send("Unable to find such id");
        }
   
})

//update user
app.patch("/user/:userId",async(req,res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try{
        const allowedUpdates = ["userId","password","age","photoUrl","about","skills"];
        const isAllowedUpdated = Object.keys(data).every((k) => allowedUpdates.includes(k));
        if(!isAllowedUpdated){
            throw new Error("Cannot allow such update");
        }
        await User.findOneAndUpdate({_id:userId},data,{returnDocument: "before",runValidators: true}) 
        res.send("updated!");    
    }catch (err){
            res.status(400).send("Unable to update :" + err.message);
    }

})

*/





/*
first we connect to database and then take request/listen on port because if in some cases
//clients start hitting api and requesting data and databse connection is not estd then its a problem
//nodemon is a tool that helps develop Node.js based applications
// by automatically restarting the node application when file changes in the directory are detected. 

const {isAuthorised} = require("./utility/isAuth");
// this above is creating a new express js application

app.use("/admin",isAuthorised);

app.get("/admin/getData",(req,res,next) => {
    res.send("DATA SENT");
})

app.post("/admin/postData",(req,res,next) => {
    res.send("DATA POSTED");
})

app.delete("/admin/deleteData",(req,res,next) => {
    res.send("DATA DELETED");
})




app.use("/user",(req,res,next) => {
    console.log("handling the 1st route")
    res.send("1. Shrey srivastav!")
    next();
    
},(req,res,next) =>{
    console.log("handling the 2nd route");
    //res.send("2. Shrey srivastav!")
    next();
},
(req,res,next) =>{
    console.log("handling the 3rd route");
    //res.send("3. Shrey srivastav!")
    next();
},
(req,res,next) =>{
    console.log("handling the 4th route");
    //res.send("4. Shrey srivastav!")
    next();
})



//this will only handle GET call to /user
app.get("/user",(req,res) => {
    res.send({"firstname":"Shrey",
        "lastname":"Srivastav",
        "Age":27
    })
})

app.post("/user",(req,res) => {
    //logic to save data in DB
    res.send("User data saved successfully.")
})


app.delete("/user",(req,res) => {
    //logic to delete data from DB
    res.send("User data deleted from DB!!")
})

//this will match all the HTTP methods API calls to /test
app.use("/test",(req,res) => {
    res.send("hey there Shrey srivastav!")
})


app.use("/",(req,res) => {
    res.send("hey there Shrey srivastav!")
})


app.use("/test",(req,res) => {
    res.send("hey there dude!!!")
})

app.use("/first/x",(req,res) => {
    res.send("yo Mr.!")
})

app.use("/first",(req,res) => {
    res.send("yo!")
})

*/