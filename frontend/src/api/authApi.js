import api from "./axios";

export const registerUser = (data) => {
  console.log(data)
  return api.post("/auth/register", data);
};

export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

export const getCurrentUser = () => {
  return api.get("/auth/me");
};

export const logoutUser = () => {
  return api.post("/auth/logout");
};
