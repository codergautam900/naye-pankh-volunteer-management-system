/**
 * NayePankh Volunteer Management System - Main App Component
 * 
 * Central routing configuration for the application
 * Routes:
 * - / : Home page (public)
 * - /register : Volunteer registration (public)
 * - /login : Admin login (public)
 * - /admin : Protected dashboard (admin only)
 * - /admin/volunteers : Protected volunteer management (admin only)
 * - * : 404 Not Found page
 */

import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Volunteers from "./pages/Volunteers.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 transition-colors dark:bg-[#080d18] dark:text-slate-50">
      {/* Global navigation bar */}
      <Navbar />
      
      {/* Route definitions */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes - Admin Only */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Nested routes under /admin */}
          <Route index element={<Dashboard />} />
          <Route path="volunteers" element={<Volunteers />} />
        </Route>
        
        {/* 404 Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
