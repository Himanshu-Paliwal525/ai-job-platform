import mongoose from "mongoose";
const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    passwordHash: { type: String, required: true, select: false },
    createdAt: { type: Date, default: Date.now },
    refreshTokenHash: { type: String, select: false },
});
export default mongoose.model("User", User);
