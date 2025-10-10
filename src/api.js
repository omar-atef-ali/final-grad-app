import axios from "axios";

const api = axios.create({
  baseURL: "/api", // 👈 خليها كده مش https://deebai.runasp.net/api
});

export default api;