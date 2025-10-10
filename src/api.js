import axios from "axios";

const api = axios.create({
  baseURL: "/api", // relative path → Netlify proxy هيوجهه للسيرفر
});

export default api;