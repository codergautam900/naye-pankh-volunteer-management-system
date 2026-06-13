import express from "express";
import {
  createVolunteer,
  deleteVolunteer,
  getVolunteers,
  updateVolunteer
} from "../controllers/volunteerController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.route("/").post(upload.single("profileImage"), createVolunteer).get(protect, getVolunteers);
router.route("/:id").put(protect, updateVolunteer).delete(protect, deleteVolunteer);

export default router;

