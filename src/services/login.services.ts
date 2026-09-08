import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomError } from "../utils/CustomError.js";
export async function loginService({ email, password }: { email: string, password: string }) {
    if (!email || !password) throw new CustomError("Email and password are required", 400);
    const user = await User.findOne({ email }).select(
        "+passwordHash +refreshTokenHash"
    );
    if (!user) throw new CustomError("Invalid email or password.", 401);
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid)
        throw new CustomError("Invalid email or password.", 401);
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

    if (!accessTokenSecret || !refreshTokenSecret) {
        throw new CustomError("JWT secrets are not properly configured", 500);
    }

    const token = jwt.sign({ id: user._id }, accessTokenSecret, {
        expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ id: user._id }, refreshTokenSecret, {
        expiresIn: "7d",
    });
    user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await user.save();

    return { token, refreshToken };
}