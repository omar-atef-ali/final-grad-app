import axios from "axios";

const baseURL =
  import.meta.env.MODE === "production"
    ? "https://deebai.runasp.net/api"
    : "/api";

const api = axios.create({
  baseURL,
});

export default api;