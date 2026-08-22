import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL:
    "https://ai-developer-career-assistant-backend.onrender.com/api",
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
        "Unable to connect to the server. Please check your internet connection."
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

      // Don't redirect immediately if already on login/register
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
       500 — SERVER ERROR
    =============================== */

    if (status >= 500) {

      toast.error(
        "Server error. Please try again later."
      );

      return Promise.reject(error);
    }


    /* ===============================
       OTHER API ERRORS
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