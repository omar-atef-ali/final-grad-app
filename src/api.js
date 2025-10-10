import axios from "axios";

const api = axios.create({
  baseURL: "https://deebai.runasp.net", // العنوان الأساسي بتاع الـ API
});

export default api;