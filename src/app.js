require("dotenv").config();
const express = require("express");
const app = express(); 
const connectDb = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./utility/auth");
const authRouter = require("./routes/authRou");
const profileRouter = require("./routes/profileRou");
const sendConnectionRouter = require("./routes/requestRoutes");
const userRouter = require("./routes/userRouter");
const cors = require("cors");
const http = require("http");
const initializeSocket = require("./utility/socket");
const chatRouter = require("./routes/chatRou");


app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://13.200.233.99"
    ],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",sendConnectionRouter);
app.use("/",userRouter);
app.use("/",chatRouter);

const server = http.createServer(app);
initializeSocket(server);

connectDb().then(() => {
    console.log("Connection Established with Database");
    server.listen(process.env.PORT, () => {
    console.log("SERVER IS SUCCESSFULLY RUNNING ON PORT 3000");
});
}).catch((err) => {
    console.error("Unable to connect to DB");
})






