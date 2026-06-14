import ActivityLog from "../models/ActivityLog.js";
import Volunteer from "../models/Volunteer.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalVolunteers,
      activeVolunteers,
      cityDistribution,
      skillsDistribution,
      availabilityDistribution,
      recentVolunteers
    ] = await Promise.all([
      Volunteer.countDocuments(),
      Volunteer.countDocuments({ isActive: true }),
      Volunteer.aggregate([{ $group: { _id: "$city", count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
      Volunteer.aggregate([{ $unwind: "$skills" }, { $group: { _id: "$skills", count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
      Volunteer.aggregate([{ $group: { _id: "$availability", count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
      Volunteer.find().sort({ createdAt: -1 }).limit(5).select("fullName city skills profileImage createdAt isActive recommendedDepartment")
    ]);
    const inactiveVolunteers = Math.max(totalVolunteers - activeVolunteers, 0);

    res.json({
      totalVolunteers,
      activeVolunteers,
      inactiveVolunteers,
      totalCities: cityDistribution.length,
      totalSkills: skillsDistribution.length,
      activationRate: totalVolunteers ? Math.round((activeVolunteers / totalVolunteers) * 100) : 0,
      topCity: cityDistribution[0]?._id || "No data",
      topSkill: skillsDistribution[0]?._id || "No data",
      cityDistribution,
      skillsDistribution,
      availabilityDistribution,
      recentVolunteers,
      lastUpdated: new Date().toISOString()
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
