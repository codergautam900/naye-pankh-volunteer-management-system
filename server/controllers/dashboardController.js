import ActivityLog from "../models/ActivityLog.js";
import Volunteer from "../models/Volunteer.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const [totalVolunteers, activeVolunteers, cityDistribution, skillsDistribution] = await Promise.all([
      Volunteer.countDocuments(),
      Volunteer.countDocuments({ isActive: true }),
      Volunteer.aggregate([{ $group: { _id: "$city", count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
      Volunteer.aggregate([{ $unwind: "$skills" }, { $group: { _id: "$skills", count: { $sum: 1 } } }, { $sort: { count: -1 } }])
    ]);

    res.json({
      totalVolunteers,
      activeVolunteers,
      totalCities: cityDistribution.length,
      totalSkills: skillsDistribution.length,
      cityDistribution,
      skillsDistribution
    });
  } catch (error) {
    next(error);
  }
};

export const getActivityLogs = async (req, res, next) => {
  try {
    const logs = await ActivityLog.find().sort({ createdAt: -1 }).limit(10);
    res.json({ logs });
  } catch (error) {
    next(error);
  }
};

