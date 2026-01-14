import axios from "axios";

const base =
  typeof window !== "undefined"
    ? (import.meta.env.VITE_API_BASE || "/api")
    : process.env.VITE_API_BASE || "/api";

const api = axios.create({
  baseURL: base,
  withCredentials: true
});

export default api;
