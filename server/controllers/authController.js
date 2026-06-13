import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || !(await admin.matchPassword(password))) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    res.json({
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });
  } catch (error) {
    next(error);
  }
};

