import mongoose from "mongoose";

 export const eventSchema = mongoose.model("Event", new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: String,
    date: {
        required: true,
        type: Date
    },
    location: String,
    image: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Store a single user ID
    attendees: { type: Number, default: 0 } // Add attendees field
}));