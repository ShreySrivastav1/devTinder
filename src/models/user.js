const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2 
    },
    lastName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password");
            }

        }
        
    },
    age: {
        type: Number,
        min: 18,
        max: 60
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender Is Invalid!!")
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://ohmylens.com/wp-content/uploads/2017/06/dummy-profile-pic.png",

    },
    about: {
        type: String,
        default: "Developer"
    },
    skills: {
        type: [String],
        validate(value){
            if(value.length > 10){
                throw new Error("Skills limit exceeded!")
            }
        }
    }
},
{
    timestamps: true
});

userSchema.methods.getJWT = async function (){
    const user = this;
    const token = await jwt.sign({_id:user._id}, "DEVtinder@10", {expiresIn: "7d"});
    return token;    
};

userSchema.methods.validatePass = async function(inputPass){
    const user = this;
    const passwordHash = user.password;
    const validPassword = await bcrypt.compare(inputPass,passwordHash);
    return validPassword;
}


module.exports = mongoose.model("User", userSchema);