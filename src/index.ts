import dotenv from "dotenv";
dotenv.config();
import express, { type Request, type Response } from "express";
import mongoose from "mongoose";
import User from "./models/User.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { redisClient } from "./worker/redisClient.ts";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("HIT:", req.method, req.path);
  next();
});

mongoose.connect(process.env.MONGODB_URI || "");

app.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.json({ message: "Email and password are required." });
    const user = await User.findOne({ email }).select(
        "+passwordHash +refreshTokenHash"
    );
    if (!user) return res.json({ message: "Invalid email or password." });
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid)
        return res.json({ message: "Invalid email or password." });
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

    if (!accessTokenSecret || !refreshTokenSecret) {
        throw new Error("JWT secrets are not properly configured");
    }

    const token = jwt.sign({ id: user._id }, accessTokenSecret, {
        expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ id: user._id }, refreshTokenSecret, {
        expiresIn: "7d",
    });
    user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await user.save();
    res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ token });
});

app.post("/signup", async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password)
        return res
            .status(400)
            .json({ message: "Email and password are required" });

    const exists = await User.findOne({ email });
    if (exists)
        return res.status(409).json({ message: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 12);
    
    const user = await User.create({
        email,
        passwordHash,
    });

    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN_SECRET!,
        { expiresIn: "7d" }
    );
    
    user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await user.save();
    
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "15m" }
    );

    res.json({ accessToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

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
