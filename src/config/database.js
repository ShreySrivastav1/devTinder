//mongodb+srv://shreysrivastav:<db_password>@shreynode.ofpgsqb.mongodb.net/
//"mongodb+srv://shreysrivastav:92qXFk4ry0BxpbEs@shreynode.ofpgsqb.mongodb.net/?appName=ShreyNode"
const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1"]);
const mongoose = require("mongoose");

const connectDb = async() => { 
    await mongoose.connect("mongodb+srv://shreysrivastav:92qXFk4ry0BxpbEs@shreynode.ofpgsqb.mongodb.net/devTinder");
};

module.exports = connectDb;


