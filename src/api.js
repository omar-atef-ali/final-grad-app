import axios from "axios";

const api = axios.create({
  baseURL: "/api", // relative path → Netlify proxy هيوجهه للسيرفر
});



/* =======================
   Refresh control
======================= */
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

/* =======================
   Request Interceptor
======================= */
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =======================
   Response Interceptor
======================= */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    /* 🌐 Network / CORS error */
    if (!error.response) {
      console.log("🌐 Network error:", error);
      return Promise.reject(error);
    }

    const url = originalRequest.url || "";

    const isAuthRequest =
      url.includes("/Auth/login") ||
      url.includes("/Auth/register") ||
      url.includes("/Auth/refresh");

    /* === Handle 401 === */
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !isAuthRequest
    ) {
      console.log("⛔ 401 detected:", url);

      const localRefreshToken = localStorage.getItem("refreshToken");
      const sessionRefreshToken = sessionStorage.getItem("refreshToken");

      const refreshToken = localRefreshToken || sessionRefreshToken;
      const storageType = localRefreshToken ? "local" : "session";

      const oldToken =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!refreshToken) {
        console.log("❌ No refresh token → logout");
        localStorage.clear();
        sessionStorage.clear();
        // window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      /* ⏳ If refresh already in progress */
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;
      console.log("♻️ Refreshing token...");

      try {
        const res = await api.post("/Auth/refresh", {
          token: oldToken,
          refreshToken,
        });

        const {
          token: newAccessToken,
          refreshToken: newRefreshToken,
        } = res.data;

        if (storageType === "local") {
          localStorage.setItem("token", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);
        } else {
          sessionStorage.setItem("token", newAccessToken);
          sessionStorage.setItem("refreshToken", newRefreshToken);
        }

        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.log("❌ Refresh failed:", refreshError);

        processQueue(refreshError, null);
        isRefreshing = false;

        /* ❗ Logout ONLY if refresh token is invalid */
        if (refreshError.response?.status === 401) {
          localStorage.clear();
          sessionStorage.clear();
          // window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);




export default api;