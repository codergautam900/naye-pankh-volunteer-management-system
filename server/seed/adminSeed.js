import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

dotenv.config();

await connectDB();

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  console.error("ADMIN_EMAIL and ADMIN_PASSWORD are required");
  process.exit(1);
}

const existingAdmin = await Admin.findOne({ email });

if (existingAdmin) {
  console.log("Admin already exists");
  process.exit(0);
}

await Admin.create({
  name: "NayePankh Admin",
  email,
  password
});

console.log("Admin created successfully");
process.exit(0);

