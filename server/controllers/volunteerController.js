import ActivityLog from "../models/ActivityLog.js";
import Volunteer from "../models/Volunteer.js";
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js";
import { recommendDepartment } from "../utils/recommendDepartment.js";
import { sendEmail } from "../utils/sendEmail.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

export const createVolunteer = async (req, res, next) => {
  let uploadedImage;

  try {
    const existingVolunteer = await Volunteer.exists({ email: req.body.email });

    if (existingVolunteer) {
      res.status(409);
      throw new Error("A volunteer with this email already exists");
    }

    const skills = req.body.skills;
    let profileImage;

    if (req.file) {
      uploadedImage = await uploadToCloudinary(req.file.buffer);
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
      action: "Volunteer Created",
      volunteer: volunteer._id,
      metadata: { email: volunteer.email }
    });

    await sendEmail({
      to: volunteer.email,
      subject: "Thank you for joining NayePankh Foundation!",
      html: `<p>Hi ${volunteer.fullName},</p><p>Thank you for joining NayePankh Foundation!</p>`
    }).catch((emailError) => {
      console.warn(`Registration email failed: ${emailError.message}`);
    });

    res.status(201).json({ message: "Volunteer registered successfully", volunteer });
  } catch (error) {
    if (uploadedImage?.public_id) {
      await deleteFromCloudinary(uploadedImage.public_id).catch(() => null);
    }

    next(error);
  }
};

export const getVolunteers = async (req, res, next) => {
  try {
    const { search = "", city = "", skill = "", status = "", sort = "latest", page = 1, limit = 8 } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }
    if (city) query.city = { $regex: city, $options: "i" };
    if (skill) query.skills = { $regex: skill, $options: "i" };
    if (status === "active") query.isActive = true;
    if (status === "inactive") query.isActive = false;

    const currentPage = Math.max(Number(page) || 1, 1);
    const pageSize = Math.min(Math.max(Number(limit) || 8, 1), 50);
    const sortMap = {
      latest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      name: { fullName: 1 },
      city: { city: 1, fullName: 1 }
    };
    const total = await Volunteer.countDocuments(query);
    const volunteers = await Volunteer.find(query)
      .sort(sortMap[sort] || sortMap.latest)
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
    if (req.body.email) {
      const duplicate = await Volunteer.findOne({ email: req.body.email, _id: { $ne: req.params.id } });

      if (duplicate) {
        res.status(409);
        throw new Error("Another volunteer is already using this email");
      }
    }

    if (req.body.skills) {
      req.body.recommendedDepartment = recommendDepartment(req.body.skills[0]);
    }

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
      volunteer: volunteer._id,
      metadata: {
        email: volunteer.email,
        updatedBy: req.admin?.email,
        changedFields: Object.keys(req.body)
      }
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

    await deleteFromCloudinary(volunteer.profileImage?.publicId).catch((error) => {
      console.warn(`Cloudinary cleanup failed: ${error.message}`);
    });

    await ActivityLog.create({
      action: "Volunteer Deleted",
      volunteer: volunteer._id,
      metadata: {
        email: volunteer.email,
        deletedBy: req.admin?.email
      }
    });

    res.json({ message: "Volunteer deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getVolunteerActivity = async (req, res, next) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id).select("email");

    if (!volunteer) {
      res.status(404);
      throw new Error("Volunteer not found");
    }

    const logs = await ActivityLog.find({
      $or: [{ volunteer: volunteer._id }, { "metadata.email": volunteer.email }]
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({ logs });
  } catch (error) {
    next(error);
  }
};
