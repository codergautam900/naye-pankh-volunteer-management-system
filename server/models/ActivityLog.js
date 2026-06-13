import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true
    },
    volunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer"
    },
    metadata: {
      type: Object,
      default: {}
    }
  },
  { timestamps: true }
);

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

export default ActivityLog;

