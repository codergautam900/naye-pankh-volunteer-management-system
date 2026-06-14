import express from "express";
import {
  createVolunteer,
  deleteVolunteer,
  getVolunteerActivity,
  getVolunteers,
  updateVolunteer
} from "../controllers/volunteerController.js";
import { protect } from "../middleware/authMiddleware.js";
import { createRateLimiter } from "../middleware/securityMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";
import { validateObjectId, validateVolunteerCreate, validateVolunteerUpdate } from "../middleware/validationMiddleware.js";

const router = express.Router();
const registrationLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 25,
  message: "Too many registration attempts, please try again later"
});

router.route("/").post(registrationLimiter, upload.single("profileImage"), validateVolunteerCreate, createVolunteer).get(protect, getVolunteers);
router.get("/:id/activity", protect, validateObjectId(), getVolunteerActivity);
router.route("/:id").put(protect, validateObjectId(), validateVolunteerUpdate, updateVolunteer).delete(protect, validateObjectId(), deleteVolunteer);

export default router;
