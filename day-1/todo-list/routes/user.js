import { Router } from "express";
import userController from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/auth.js";

const userRouter = Router();

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/me", isAuthenticated, userController.getUserDetails);

export default userRouter;
