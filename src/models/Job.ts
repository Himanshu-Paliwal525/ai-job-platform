import mongoose from "mongoose";
const Job = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "progress", "completed", "failed"],
        default: "pending",
    },
    createdAt: { type: Date, default: Date.now },
    completedAt: { type: Date, default: null },
})

export default mongoose.model("Job", Job)
