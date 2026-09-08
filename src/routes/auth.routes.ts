import { Router } from "express";
import { signupController } from "../controllers/signup.controller.js";
import { loginController } from "../controllers/login.controller.js";


const authRouter = Router();
authRouter.post("/signup", signupController)
authRouter.post("/login", loginController)
export default authRouter;