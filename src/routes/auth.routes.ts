import { Router } from "express";
import { signupController } from "../controllers/signup.controller.js";
import { loginController } from "../controllers/login.controller.js";


const router = Router();
router.post("/signup", signupController)
router.post("/login", loginController)
export default router;