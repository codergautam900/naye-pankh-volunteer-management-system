/**
 * NayePankh Volunteer Management System - Backend Server
 * Main Express server entry point with middleware setup, routes, and database connection
 * ALSO SERVES FRONTEND (Single Deployment Setup)
 */

import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { createRateLimiter, securityHeaders } from "./middleware/securityMiddleware.js";

// Get directory path for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 5000;

// Rate limiting configurations for API and auth endpoints
const apiLimiter = createRateLimiter({ max: 240 });
const authLimiter = createRateLimiter({ windowMs: 10 * 60 * 1000, max: 20, message: "Too many login attempts, please try again later" });

connectDB();

// Security: Disable X-Powered-By header to avoid revealing server info
app.disable("x-powered-by");
app.use(securityHeaders);

// CORS configuration for frontend access
// In production with single deployment, frontend is on same domain so CORS not strictly needed
// But kept for API calls from other origins if needed
app.use(cors({ 
  origin: process.env.CLIENT_URL || "http://localhost:5173", 
  credentials: true 
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "NayePankh Volunteer Management API is running" });
});

// Health check endpoint - used for monitoring and deployment verification
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: Math.round(process.uptime()),
    database: mongoose.connection.readyState === 1 ? "connected" : "not_connected",
    timestamp: new Date().toISOString()
  });
});

// Apply rate limiting to all API routes
app.use("/api", apiLimiter);

// Route definitions with specific rate limiting for auth
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/exports", exportRoutes);

// ===== FRONTEND SERVING (Single Deployment) =====
// Serve static files from public folder (built React app)
const publicPath = path.join(__dirname, "../client/dist");
app.use(express.static(publicPath));

// SPA routing - Serve index.html for all non-API routes
// This allows React Router to handle all routes on frontend
app.get("*", (req, res) => {
  // Only serve index.html for non-API routes
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(publicPath, "index.html"));
  }
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
