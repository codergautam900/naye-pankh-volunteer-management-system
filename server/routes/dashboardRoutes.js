import express from "express";
import { getActivityLogs, getDashboardStats } from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", protect, getDashboardStats);
router.get("/activity-logs", protect, getActivityLogs);

export default router;

