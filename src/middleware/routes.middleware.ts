import { type Request, type Response, type NextFunction } from "express";
import { CustomError } from "../utils/CustomError.js";
import jwt from "jsonwebtoken";
export const routesMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new CustomError("Invalid or missing token", 401);
        }
        const token = authHeader.split(" ")[1];
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

        if (!accessTokenSecret) {
            throw new CustomError("JWT secrets are not properly configured", 500);
        }
        const { id } = jwt.verify(token, accessTokenSecret) as { id: string };
        (req as any).userId = id;
        next();

    } catch (error: any) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(401).json({ message: "Invalid or Expired token" });
        }
    }
}