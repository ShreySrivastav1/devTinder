const express = require("express");
const app = express(); 
// this above is creating a new express js application


/*
app.use("/",(req,res) => {
    res.send("hey there Shrey srivastav!")
})
*/

app.use("/test",(req,res) => {
    res.send("hey there dude!!!")
})

app.use("/first",(req,res) => {
    res.send("yo!")
})


//creating a web server and  now i would have to listen()
app.listen(3000, () => {
    console.log("SERVER IS SUCCESSFULLY RUNNING ON PORT 3000");
});

//nodemon is a tool that helps develop Node.js based applications
// by automatically restarting the node application when file changes in the directory are detected. 