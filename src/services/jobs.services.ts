import Job from "../models/Job.js";
import { CustomError } from "../utils/CustomError.js";
export const createJobService = async ({ userId, title }: { userId: string, title: string }) => {
    try {
        const job = await Job.create({ userId, title });
        return job;

    } catch (error: any) {
        if (error instanceof CustomError) {
            throw error;
        } else {
            throw new CustomError("Failed to create job", 500);
        }
    }
}

export const fetchAllJobsService = async ({ userId, limit }: { userId: string, limit: number }) => {
    try {
        const jobs = await Job.find({ userId }).limit(limit);
        return jobs;
    } catch (error: any) {
        if (error instanceof CustomError) {
            throw error;
        } else {
            throw new CustomError("Failed to fetch jobs", 500);
        }
    }
}