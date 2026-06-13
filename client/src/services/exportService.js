import api from "./api.js";

export const downloadCsvReport = async () => {
  const response = await api.get("/exports/volunteers/csv", {
    responseType: "blob"
  });

  return response.data;
};

