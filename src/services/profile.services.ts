import User from "../models/User.js";
import { CustomError } from "../utils/CustomError.js";

export const profileService = async (userId: string) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        return user;
    } catch (error: any) {
        throw new CustomError(error.message, error.statusCode);
    }
}