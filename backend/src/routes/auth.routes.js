import express from "express";
const router = express.Router();
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);

router.get("/check", authMiddleware, (req, res) => {
  res.status(200).json(req.user);
});
export default router;
