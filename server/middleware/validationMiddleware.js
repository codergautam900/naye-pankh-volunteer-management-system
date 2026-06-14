import mongoose from "mongoose";
import { z } from "zod";

const allowedSkills = [
  "Teaching",
  "Web Development",
  "Content Writing",
  "Social Media",
  "Fundraising",
  "Graphic Design",
  "Event Management"
];

const allowedAvailability = ["Weekdays", "Weekends", "Flexible"];

const trimValue = (value) => (typeof value === "string" ? value.trim() : value);
const requiredString = (field) =>
  z.preprocess((value) => trimValue(value) ?? "", z.string().min(1, `${field} is required`));
const optionalString = (schema) => z.preprocess(trimValue, schema).optional();

const normalizeSkills = (value) => {
  if (Array.isArray(value)) return value.map(trimValue).filter(Boolean);
  if (typeof value === "string" && value.trim()) return [value.trim()];
  return [];
};

const normalizeBoolean = (value) => {
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  return value;
};

const phoneSchema = (schema) =>
  schema.refine((value) => {
    if (value === undefined) return true;
    const digits = String(value || "").replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15;
  }, "Phone number must contain 7 to 15 digits");

const availabilitySchema = (schema) =>
  schema.refine(
    (value) => value === undefined || allowedAvailability.includes(value),
    "Availability must be Weekdays, Weekends, or Flexible"
  );

const skillsSchema = z
  .preprocess(normalizeSkills, z.array(z.string()).min(1, "At least one skill is required"))
  .refine((skills) => skills.every((skill) => allowedSkills.includes(skill)), "One or more selected skills are not supported");

const booleanSchema = z.preprocess(normalizeBoolean, z.boolean({ message: "isActive must be true or false" })).optional();

const volunteerCreateSchema = z.object({
  fullName: requiredString("Full name"),
  email: requiredString("Email").pipe(z.email("Valid email is required").transform((email) => email.toLowerCase())),
  phone: phoneSchema(requiredString("Phone")),
  city: requiredString("City"),
  availability: availabilitySchema(requiredString("Availability")),
  skills: skillsSchema,
  isActive: booleanSchema
});

const volunteerUpdateSchema = z.object({
  fullName: optionalString(z.string().min(1, "Full name cannot be empty")),
  email: optionalString(z.email("Valid email is required").transform((email) => email.toLowerCase())),
  phone: phoneSchema(optionalString(z.string().min(1, "Phone cannot be empty"))),
  city: optionalString(z.string().min(1, "City cannot be empty")),
  availability: availabilitySchema(optionalString(z.string().min(1, "Availability cannot be empty"))),
  skills: skillsSchema.optional(),
  isActive: booleanSchema
});

const loginSchema = z.object({
  email: requiredString("Email").pipe(z.email("Valid email is required").transform((email) => email.toLowerCase())),
  password: requiredString("Password").pipe(z.string().min(6, "Password must be at least 6 characters"))
});

const parseWithSchema = (schema, req, res, next, { requireBody = false } = {}) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const messages = [...new Set(result.error.issues.map((issue) => issue.message))];
    res.status(400);
    return next(new Error(messages.join(". ")));
  }

  if (requireBody && Object.keys(result.data).length === 0) {
    res.status(400);
    return next(new Error("No valid update fields provided"));
  }

  req.body = result.data;
  return next();
};

export const validateObjectId = (paramName = "id") => (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params[paramName])) {
    res.status(400);
    return next(new Error("Invalid volunteer id"));
  }

  return next();
};

export const validateLogin = (req, res, next) => parseWithSchema(loginSchema, req, res, next);

export const validateVolunteerCreate = (req, res, next) => parseWithSchema(volunteerCreateSchema, req, res, next);

export const validateVolunteerUpdate = (req, res, next) =>
  parseWithSchema(volunteerUpdateSchema, req, res, next, { requireBody: true });
