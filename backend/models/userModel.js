import mongoose from "mongoose";
const schema = new mongoose.Schema({
    name: String,
    photo: String,
    googleId: {
        type: String,
        // required: true,
        unique: true,
    },
});
export const User = mongoose.model("User", schema);
