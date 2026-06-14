/**
 * Axios API Instance Configuration
 * 
 * Handles:
 * - Centralized API base URL configuration
 * - Automatic JWT token injection in requests
 * - Authentication header management
 */

import axios from "axios";

/**
 * Create axios instance with base URL
 * Uses VITE_API_BASE_URL environment variable or defaults to localhost
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
});

/**
 * Request Interceptor
 * Automatically adds JWT token from localStorage to all API requests
 * This ensures protected endpoints receive authentication
 */
api.interceptors.request.use((config) => {
  // Retrieve token from localStorage
  const token = localStorage.getItem("nayepankh_token");

  // If token exists, add to Authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;

