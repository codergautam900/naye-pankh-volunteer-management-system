import express from "express";
import { exportVolunteersCsv } from "../controllers/exportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/volunteers/csv", protect, exportVolunteersCsv);

export default router;

