import axios from "axios";

const api = axios.create({
  baseURL: "/api", // relative path → Netlify proxy هيوجهه للسيرفر
});


const refreshClient = axios.create({
  baseURL: "/api",
});

/* =========================
   Refresh State
========================= */

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

/* =========================
   Request Interceptor
========================= */

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   Response Interceptor
========================= */

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }

    /* =========================
       Handle 401
    ========================= */

    if (error.response.status === 401 && !originalRequest._retry) {
      const refreshToken = localStorage.getItem("refreshToken");
      const oldToken = localStorage.getItem("token");

      if (!refreshToken) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      /* =========================
         If refresh already running
      ========================= */

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

      /* =========================
         Start Refresh Flow
      ========================= */

      isRefreshing = true;

      try {
        const res = await refreshClient.post("/Auth/refresh", {
          oldToken,
          refreshToken,
        });

        const {
          token: newAccessToken,
          refreshToken: newRefreshToken,
        } = res.data;

        /* Save new tokens */
        localStorage.setItem("token", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        /* Resolve queued requests */
        processQueue(null, newAccessToken);

        /* Retry original request */
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        const status = refreshError.response?.status;

        if ([400, 401, 403].includes(status)) {
          localStorage.clear();
          window.location.replace("/login");
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false; // 🔥 مهم جدًا
      }
    }

    return Promise.reject(error);
  }
);

export default api;