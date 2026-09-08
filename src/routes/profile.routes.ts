import { Router } from "express";
import { routesMiddleware } from "../middleware/routes.middleware.js";
import { profileController } from "../controllers/profile.controller.js";
const profileRouter = Router();

profileRouter.get("/profile", routesMiddleware, profileController);

export default profileRouter;