import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    skills: {
      type: [String],
      required: true,
      default: []
    },
    availability: {
      type: String,
      required: true
    },
    profileImage: {
      url: String,
      publicId: String
    },
    recommendedDepartment: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

volunteerSchema.index({ fullName: 1 });
volunteerSchema.index({ city: 1 });
volunteerSchema.index({ skills: 1 });
volunteerSchema.index({ isActive: 1, createdAt: -1 });

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

export default Volunteer;
