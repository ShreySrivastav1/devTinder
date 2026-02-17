const express = require("express");
const app = express(); 
// this above is creating a new express js application

app.use("/user",(req,res) => {
    res.send("hey there Shrey srivastav!")
})
//order matters


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



//order of the routes matter
//creating a web server and  now i would have to listen()
app.listen(3000, () => {
    console.log("SERVER IS SUCCESSFULLY RUNNING ON PORT 3000");
});

//nodemon is a tool that helps develop Node.js based applications
// by automatically restarting the node application when file changes in the directory are detected. 


/*
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