
const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1"]);
const mongoose = require("mongoose");

console.log(process.env.DB_CONNECTION_SECRET)

const connectDb = async() => { 
    await mongoose.connect(process.env.DB_CONNECTION_SECRET);
};

module.exports = connectDb;


