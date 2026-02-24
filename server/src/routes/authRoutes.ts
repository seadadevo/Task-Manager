import { Router } from "express";
import validate from "../middlewares/validate";
import { loginSchema, signupSchema } from "../schemas/authSchema";
import { register, login, refresh, logout, getMe } from "../controllers/authController";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = Router();

router.post( '/signup' , validate(signupSchema), register);
router.post( '/login' , validate(loginSchema), login);
router.post( '/refresh' , refresh);
router.post( '/logout' , logout);

router.get('/me' , isAuthenticated , getMe);

export default router;
