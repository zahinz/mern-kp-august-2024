import { Router } from "express";
import todoController from "../controllers/todo.controller.js";
import isAuthenticated from "../middleware/auth.js";

const todoRouter = Router();

todoRouter.get("/", isAuthenticated, todoController.listAllTodos);
todoRouter.post("/", isAuthenticated, todoController.createTodo);

export default todoRouter;
