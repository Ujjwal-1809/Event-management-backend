import express from 'express';
import { handleSignup, handleLogin, checkAuth, handleLogout } from '../controllers/authController.js';
import { protectRoute } from '../middleware/protectRoutes.js';

const router = express.Router();

router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);
router.get("/check", protectRoute, checkAuth);

export default router