import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000,
});

/* =========================================
   REQUEST INTERCEPTOR
========================================= */

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


/* =========================================
   RESPONSE INTERCEPTOR
========================================= */

api.interceptors.response.use(

  (response) => {
    return response;
  },

  (error) => {

    /* ===============================
       NO RESPONSE FROM SERVER
    =============================== */

    if (!error.response) {

      toast.error(
        "Unable to connect to the server."
      );

      return Promise.reject(error);
    }


    const status = error.response.status;


    /* ===============================
       401 — UNAUTHORIZED
    =============================== */

    if (status === 401) {

      localStorage.removeItem("token");

      toast.error(
        "Your session has expired. Please login again."
      );

      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/register"
      ) {
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }


    /* ===============================
       403 — FORBIDDEN
    =============================== */

    if (status === 403) {

      toast.error(
        "You don't have permission to perform this action."
      );

      return Promise.reject(error);
    }


    /* ===============================
       404 — NOT FOUND
    =============================== */

    if (status === 404) {

      toast.error(
        error.response?.data?.message ||
        "Requested resource was not found."
      );

      return Promise.reject(error);
    }


    /* ===============================
       SERVER ERROR
    =============================== */

    if (status >= 500) {

      console.error(
        "Server Error:",
        error.response?.data
      );

      toast.error(
        error.response?.data?.message ||
        "Server error. Please try again later."
      );

      return Promise.reject(error);
    }


    /* ===============================
       OTHER ERRORS
    =============================== */

    if (error.response?.data?.message) {

      toast.error(
        error.response.data.message
      );
    }

    return Promise.reject(error);
  }
);

export default api;