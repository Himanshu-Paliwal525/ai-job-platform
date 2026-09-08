import { type Request, type Response } from "express";
import { signupService } from "../services/signup.services.js";
import { CustomError } from "../utils/CustomError.js";
export const signupController = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const result = await signupService({ name, email, password });

        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            accessToken: result.accessToken,
        });
    } catch (error : any) {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({
                message: error.message,
            });
        }
        else{
            return res.status(500).json({
                message: error.message,
            });
        }
    }
};