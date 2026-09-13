import { Router } from "express";

import { routesMiddleware } from "../middleware/routes.middleware.js";
import {
    createJobController,
    fetchJobController,
    fetchJobStatusController,
    fetchAllJobsController
} from "../controllers/jobs.controller.js";
import { JobsMiddleware } from "../middleware/jobs.middleware.js";

const router = Router();

router.post("/jobs", routesMiddleware, createJobController);
router.get("/jobs/:id", routesMiddleware, JobsMiddleware, fetchJobController);
router.get("/jobs/:id/status", routesMiddleware, JobsMiddleware, fetchJobStatusController);
router.get("/jobs", routesMiddleware, fetchAllJobsController);

export default router;