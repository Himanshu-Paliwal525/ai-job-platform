import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/CustomError.js";
import Job from "../models/Job.js";

export const JobsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).userId;
        if (!userId) throw new CustomError("Unauthorized", 401);
        const job = await Job.findOne({ _id: req.params.id, userId });
        if (!job) throw new CustomError("Job not found", 404);
        (req as any).job = job;
        next();
    } catch (error) {
        next(error);
    }

}