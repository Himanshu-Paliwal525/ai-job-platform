import { type Request, type Response } from "express";
import { profileService } from "../services/profile.services.js";
export const profileController = async (req: Request, res: Response) => {
    try {
        const user = await profileService((req as any).userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}