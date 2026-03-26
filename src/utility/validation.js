const validator = require("validator");

const validateEditProfileData = (req) => {
    const allowedUpdates = ["emailId","firstName","lastName","gender","age","skills","about","photoUrl"];
    const isAllowedUpdates = Object.keys(req.body).every((fields) => allowedUpdates.includes(fields));
    return isAllowedUpdates;    
}

module.exports = validateEditProfileData;