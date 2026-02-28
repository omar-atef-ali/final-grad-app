import axios from "axios";

const api = axios.create({
  baseURL: "/api", // relative path → Netlify proxy هيوجهه للسيرفر
});


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // console.log("📤 Sending request:", config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (!error.response) return Promise.reject(error);

    // === 401 AND not retried before ===
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log("⛔ 401 detected for:", originalRequest.url);

      const refreshToken = localStorage.getItem("refreshToken");
      const oldToken = localStorage.getItem("token");

      if (!refreshToken) {
        console.log("❌ No refresh token → rejecting request");
        // No hard redirect here, let the UI or caller handle it
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (isRefreshing) {
        console.log("⏳ Refresh already in progress → queue request");
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            console.log("🔁 Retrying queued request:", originalRequest.url);
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;
      console.log("♻️ Starting refresh flow...");

      try {
        const res = await api.post("/Auth/refresh", {
          oldToken,
          refreshToken,
        });

        const { token: newAccessToken, refreshToken: newRefreshToken } =
          res.data;

        localStorage.setItem("token", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        console.log("✅ Refresh success");

        processQueue(null, newAccessToken);
        isRefreshing = false;

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        console.log("🔁 Retrying original request:", originalRequest.url);
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;

        // Log the error for debugging
        console.log("❌ Refresh failed:", refreshError.response?.status || refreshError.message);

        // ONLY logout if the server specifically rejects the refresh token
        // usually 401 (Unauthorized) or 403 (Forbidden) or 400 (Bad Request)
        const refreshStatus = refreshError.response?.status;
        if (refreshStatus === 401 || refreshStatus === 403 || refreshStatus === 400) {
          console.log("🔥 Refresh token expired or invalid. Logging out...");
          processQueue(refreshError, null);
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }

        // If it's a network error or 500, just fail the queue but don't logout
        console.log("⚠️ Token refresh failed due to network/server issue. No logout.");
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;