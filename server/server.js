import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { createRateLimiter, securityHeaders } from "./middleware/securityMiddleware.js";

const app = express();
const port = process.env.PORT || 5000;
const apiLimiter = createRateLimiter({ max: 240 });
const authLimiter = createRateLimiter({ windowMs: 10 * 60 * 1000, max: 20, message: "Too many login attempts, please try again later" });

connectDB();

app.disable("x-powered-by");
app.use(securityHeaders);
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "NayePankh Volunteer Management API is running" });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: Math.round(process.uptime()),
    database: mongoose.connection.readyState === 1 ? "connected" : "not_connected",
    timestamp: new Date().toISOString()
  });
});

app.use("/api", apiLimiter);
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/exports", exportRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
