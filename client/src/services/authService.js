import api from "./api.js";

export const loginAdmin = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

