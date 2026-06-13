import api from "./api.js";

export const registerVolunteer = async (formData) => {
  const { data } = await api.post("/volunteers", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return data;
};

export const getVolunteers = async (params) => {
  const { data } = await api.get("/volunteers", { params });
  return data;
};

export const updateVolunteer = async (id, payload) => {
  const { data } = await api.put(`/volunteers/${id}`, payload);
  return data;
};

export const deleteVolunteer = async (id) => {
  const { data } = await api.delete(`/volunteers/${id}`);
  return data;
};

