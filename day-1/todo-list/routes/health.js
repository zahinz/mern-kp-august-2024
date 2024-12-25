import { Router } from "express";
import healthController from "../controllers/health.controller.js";

const healthRouter = Router();

healthRouter.get("/", healthController.getHealth);
healthRouter.post("/", healthController.postHealth);

export default healthRouter;
