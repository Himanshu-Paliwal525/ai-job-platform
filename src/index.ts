import dotenv from "dotenv";
dotenv.config();
import express, { type Request, type Response } from "express";
import mongoose from "mongoose";
import router from "./routes/auth.js";
// import { redisClient } from "./worker/redisClient.ts";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URI || "");


app.use(router);

app.get('/', (req: Request, res: Response) => {
    res.json({ message: "Hello World!" });
})
// app.post("/jobs", async (req: Request, res: Response) => {
//     const limit = 5;
//     const { task, userId } = req.body;
//     const counter = await redisClient.incr(`jobs:${userId}`);
//     if (counter === 1) await redisClient.expire(`jobs:${userId}`, 60);
//     if (counter > limit) return res.json({ message: "Limit exceeds." });
// });
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
