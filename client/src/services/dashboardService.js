import api from "./api.js";

export const getDashboardStats = async () => {
  const { data } = await api.get("/dashboard/stats");
  return data;
};

export const getActivityLogs = async () => {
  const { data } = await api.get("/dashboard/activity-logs");
  return data;
};

