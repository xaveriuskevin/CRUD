const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    
    userName : {
        type : String,
        required : true,
        unique: [true, "username already exists in database!"],
    },

    accountNumber : {
        type : String,
        required : true,
        min : 8,
        max : 8
    },

    emailAddress : {
        type : String,
        lowercase : true,
        unique: [true, "email already exists in database!"],
    },

    identityNumber :{
        type : String,
        min : 16,
        max : 16,
        unique: [true, "identity number already exists in database!"],
    },

    createdAt : {
        type : Date,
        default : () => Date.now()
    },

    updatedAt : {
        type : Date,
        default : () => Date.now()
    },
})

module.exports = mongoose.model("user", UserSchema);