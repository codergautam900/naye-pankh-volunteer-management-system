import express from "express";
import { loginAdmin } from "../controllers/authController.js";
import { validateLogin } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/login", validateLogin, loginAdmin);

export default router;
