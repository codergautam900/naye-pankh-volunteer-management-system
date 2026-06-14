import dotenv from "dotenv";
import connectDB from "../config/db.js";
import ActivityLog from "../models/ActivityLog.js";
import Admin from "../models/Admin.js";
import Volunteer from "../models/Volunteer.js";
import { recommendDepartment } from "../utils/recommendDepartment.js";

dotenv.config();

await connectDB();

const demoVolunteers = [
  {
    fullName: "Aarav Mehta",
    email: "aarav.demo@nayepankh.org",
    phone: "9876543210",
    city: "Delhi",
    skills: ["Teaching", "Content Writing"],
    availability: "Weekends",
    isActive: true
  },
  {
    fullName: "Priya Sharma",
    email: "priya.demo@nayepankh.org",
    phone: "9876543211",
    city: "Mumbai",
    skills: ["Social Media", "Graphic Design"],
    availability: "Flexible",
    isActive: true
  },
  {
    fullName: "Kabir Khan",
    email: "kabir.demo@nayepankh.org",
    phone: "9876543212",
    city: "Bengaluru",
    skills: ["Web Development"],
    availability: "Weekdays",
    isActive: true
  },
  {
    fullName: "Ananya Rao",
    email: "ananya.demo@nayepankh.org",
    phone: "9876543213",
    city: "Pune",
    skills: ["Fundraising", "Event Management"],
    availability: "Weekends",
    isActive: false
  },
  {
    fullName: "Rohan Verma",
    email: "rohan.demo@nayepankh.org",
    phone: "9876543214",
    city: "Jaipur",
    skills: ["Teaching", "Event Management"],
    availability: "Flexible",
    isActive: true
  },
  {
    fullName: "Meera Iyer",
    email: "meera.demo@nayepankh.org",
    phone: "9876543215",
    city: "Chennai",
    skills: ["Content Writing", "Social Media"],
    availability: "Weekdays",
    isActive: true
  }
];

if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
  const adminExists = await Admin.exists({ email: process.env.ADMIN_EMAIL });

  if (!adminExists) {
    await Admin.create({
      name: "NayePankh Admin",
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: "admin"
    });
  }
}

let createdCount = 0;

for (const volunteerData of demoVolunteers) {
  const existingVolunteer = await Volunteer.findOne({ email: volunteerData.email });

  if (existingVolunteer) continue;

  const volunteer = await Volunteer.create({
    ...volunteerData,
    recommendedDepartment: recommendDepartment(volunteerData.skills[0])
  });

  await ActivityLog.create({
    action: "Demo Volunteer Added",
    volunteer: volunteer._id,
    metadata: { email: volunteer.email }
  });

  createdCount += 1;
}

console.log(`Demo seed complete. Added ${createdCount} volunteer(s).`);
process.exit(0);
