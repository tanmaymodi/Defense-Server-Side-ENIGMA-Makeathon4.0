const mongoose = require('mongoose');
const Schema = mongoose.Schema
//user details schema
const userDetails = new Schema({
    name: {
        type: String,
        required: [true, "Nmae of patient is required"]
    }, 
    email: {
        type: String,
        required: [true, "Email of patient is required"]
    },
    password: {
        type: String,
        required: [true, "Password of patient is required"]
    },
    username: String,
    registered: {
        type: Boolean,
        default: false
    },
    contact: String,
    otp: String,
})

const User = mongoose.model("UserDetails", userDetails);
module.exports = User;