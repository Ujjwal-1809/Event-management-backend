import mongoose from "mongoose";

 export const userSchema = mongoose.model("User", new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    email:{
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    profileImg:{
        type: String,
        default: ""
    },
}, { timestamps: true }));