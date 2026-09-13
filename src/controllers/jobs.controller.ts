import { type Request, type Response } from "express";
import { CustomError } from "../utils/CustomError.js";
import { createJobService, fetchAllJobsService } from "../services/jobs.services.js";
export const createJobController = async (req: Request, res: Response) => {
    const { title } = req.body;
    const userId = (req as any).userId;
    if (!title) {
        throw new CustomError("Title is required", 400);
    }
    const job = await createJobService({ userId, title });
    res.status(201).json({ message: "Job created successfully", job });
}

export const fetchJobController = async (req: Request, res: Response) => {
    const job = (req as any).job;
    res.status(200).json({ message: "Job fetched successfully", job });
}

export const fetchJobStatusController = async (req: Request, res: Response) => {
    const job = (req as any).job;
    res.status(200).json({ message: "Job status fetched successfully", status: job.status });
}

export const fetchAllJobsController = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const { limit } = req.query;
    const jobs = await fetchAllJobsService({ userId, limit: Number(limit) || 10 });
    res.status(200).json({ message: "Jobs fetched successfully", jobs });

}