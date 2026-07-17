import axios from "axios";

const API = "http://localhost:5000/api/history";

const getToken = () => localStorage.getItem("token");

const config = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

export const getHistory = () => {
  return axios.get(API, config());
};

export const deleteHistory = (id) => {
  return axios.delete(`${API}/${id}`, config());
};

export const getDashboardStats = () => {
  return axios.get(`${API}/stats`, config());
};