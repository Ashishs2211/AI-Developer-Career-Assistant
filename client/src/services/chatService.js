import api from "./api";

export const sendMessage = async (message) => {
  return api.post("/chat", {
    message,
  });
};