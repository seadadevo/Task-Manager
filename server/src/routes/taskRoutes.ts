import { Router } from "express";
import { createTask, getTasks, getTaskById, deleteTask, updateTask, deleteAll, getTaskStats } from "../controllers/taskController";
import { isAuthenticated } from "../middlewares/authMiddleware";
import validate from "../middlewares/validate";
import { createTaskSchema, updateTaskSchema } from "../schemas/taskSchema";

const router = Router();

router.post("/create", isAuthenticated, validate(createTaskSchema), createTask);
router.get("/", isAuthenticated, getTasks);
router.get("/stats", isAuthenticated, getTaskStats);
router.get("/:id", isAuthenticated, getTaskById);
router.put("/:id", isAuthenticated, validate(updateTaskSchema), updateTask);
router.delete("/delete/:id", isAuthenticated, deleteTask);
router.delete("/delete-all", isAuthenticated, deleteAll);

export default router;