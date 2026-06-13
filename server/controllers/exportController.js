import { Parser } from "json2csv";
import Volunteer from "../models/Volunteer.js";

export const exportVolunteersCsv = async (req, res, next) => {
  try {
    const volunteers = await Volunteer.find().lean();
    const parser = new Parser({
      fields: ["fullName", "email", "phone", "city", "skills", "availability", "recommendedDepartment", "isActive"]
    });
    const csv = parser.parse(volunteers);

    res.header("Content-Type", "text/csv");
    res.attachment("nayepankh-volunteers.csv");
    res.send(csv);
  } catch (error) {
    next(error);
  }
};

