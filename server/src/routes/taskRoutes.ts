import { Router } from "express";
import { createTask , getTasks , getTaskById  , deleteTask, updateTask, deleteAll } from "../controllers/taskController";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = Router();

router.post('/create' , isAuthenticated , createTask);
router.get('/' , isAuthenticated , getTasks);
router.get('/:id' , isAuthenticated , getTaskById);
router.put('/:id' , isAuthenticated , updateTask);
router.delete('/delete/:id' , isAuthenticated , deleteTask);
router.delete('/delete-all' , isAuthenticated , deleteAll);

export default router;