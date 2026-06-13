import ActivityLog from "../models/ActivityLog.js";
import Volunteer from "../models/Volunteer.js";
import { recommendDepartment } from "../utils/recommendDepartment.js";
import { sendEmail } from "../utils/sendEmail.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

export const createVolunteer = async (req, res, next) => {
  try {
    const skills = Array.isArray(req.body.skills) ? req.body.skills : [req.body.skills].filter(Boolean);
    let profileImage;

    if (req.file) {
      const uploadedImage = await uploadToCloudinary(req.file.buffer);
      profileImage = {
        url: uploadedImage.secure_url,
        publicId: uploadedImage.public_id
      };
    }

    const volunteer = await Volunteer.create({
      ...req.body,
      skills,
      profileImage,
      recommendedDepartment: recommendDepartment(skills[0])
    });

    await ActivityLog.create({
      action: "Volunteer Added",
      volunteer: volunteer._id,
      metadata: { email: volunteer.email }
    });

    await sendEmail({
      to: volunteer.email,
      subject: "Thank you for joining NayePankh Foundation!",
      html: `<p>Hi ${volunteer.fullName},</p><p>Thank you for joining NayePankh Foundation!</p>`
    });

    res.status(201).json({ message: "Volunteer registered successfully", volunteer });
  } catch (error) {
    next(error);
  }
};

export const getVolunteers = async (req, res, next) => {
  try {
    const { search = "", city = "", skill = "", page = 1, limit = 8 } = req.query;
    const query = {};

    if (search) query.fullName = { $regex: search, $options: "i" };
    if (city) query.city = { $regex: city, $options: "i" };
    if (skill) query.skills = { $regex: skill, $options: "i" };

    const currentPage = Number(page);
    const pageSize = Number(limit);
    const total = await Volunteer.countDocuments(query);
    const volunteers = await Volunteer.find(query)
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    res.json({
      volunteers,
      pagination: {
        total,
        page: currentPage,
        pages: Math.ceil(total / pageSize) || 1
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateVolunteer = async (req, res, next) => {
  try {
    const volunteer = await Volunteer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!volunteer) {
      res.status(404);
      throw new Error("Volunteer not found");
    }

    await ActivityLog.create({
      action: "Volunteer Updated",
      volunteer: volunteer._id
    });

    res.json({ message: "Volunteer updated successfully", volunteer });
  } catch (error) {
    next(error);
  }
};

export const deleteVolunteer = async (req, res, next) => {
  try {
    const volunteer = await Volunteer.findByIdAndDelete(req.params.id);

    if (!volunteer) {
      res.status(404);
      throw new Error("Volunteer not found");
    }

    await ActivityLog.create({
      action: "Volunteer Deleted",
      metadata: { email: volunteer.email }
    });

    res.json({ message: "Volunteer deleted successfully" });
  } catch (error) {
    next(error);
  }
};

