import { type Request, type Response } from "express";
import { loginService } from "../services/login.js";
import { CustomError } from "../utils/CustomError.js";
export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { token, refreshToken } = await loginService({ email, password });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ token });
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}