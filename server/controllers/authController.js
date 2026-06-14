import ActivityLog from "../models/ActivityLog.js";
import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";

/**
 * Admin Login Handler
 * Authenticates admin credentials and issues JWT token
 * 
 * @param {Object} req - Express request object with email and password in body
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Find admin by email
    const admin = await Admin.findOne({ email });

    // Verify credentials (email exists and password matches)
    if (!admin || !(await admin.matchPassword(password))) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    // Log admin login activity for audit trail
    await ActivityLog.create({
      action: "Admin Login",
      metadata: { email: admin.email }
    });

    // Return JWT token and admin info
    res.json({
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    next(error);
  }
};
