import api from "./api";

export const register = (userData) =>
  api.post("/auth/register", userData);

export const login = (userData) =>
  api.post("/auth/login", userData);

export const getProfile = () =>
  api.get("/auth/profile");

export const updateProfile = (profileData) =>
  api.put("/auth/profile", profileData);

export const changePassword = (passwordData) =>
  api.put("/auth/change-password", passwordData);