import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { CustomError } from "../utils/CustomError.js";
export async function signupService({ name, email, password }: { name: string, email: string, password: string }) {
    if (!name || !email || !password) {
        throw new CustomError("name, email and password are required", 400);
    }

    const exists = await User.findOne({ email });

    if (exists) {
        throw new CustomError("Email already registered", 409);
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
        name,
        email,
        passwordHash,
    });
    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
        throw new CustomError("JWT secrets are not properly configured", 500);
    }
    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );

    user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await user.save();

    const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );

    return {
        accessToken,
        refreshToken,
    };
}