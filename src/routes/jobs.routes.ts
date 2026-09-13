import { Router } from "express";

import { routesMiddleware } from "../middleware/routes.middleware.js";
import {
    createJobController,
    fetchJobController,
    fetchJobStatusController,
    fetchAllJobsController
} from "../controllers/jobs.controller.js";
import { JobsMiddleware } from "../middleware/jobs.middleware.js";

const jobsRouter = Router();

jobsRouter.post("/jobs", routesMiddleware, createJobController);
jobsRouter.get("/jobs/:id", routesMiddleware, JobsMiddleware, fetchJobController);
jobsRouter.get("/jobs/:id/status", routesMiddleware, JobsMiddleware, fetchJobStatusController);
jobsRouter.get("/jobs", routesMiddleware, fetchAllJobsController);

export default jobsRouter;