import { Router } from "express";
import { routesMiddleware } from "../middleware/routes.middleware.js";
import { profileController } from "../controllers/profile.controller.js";
const router = Router();

router.get("/profile", routesMiddleware, profileController);

export default router;