import api from "./api";

export const getHistory = () => {
  return api.get("/history");
};

export const deleteHistory = (id) => {
  return api.delete(`/history/${id}`);
};

export const getDashboardStats = () => {
  return api.get("/history/stats");
};