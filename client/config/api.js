import axios from "axios";

const api = axios.create({
  baseURL: "https://embediq.onrender.com",
});

api.interceptors.request.use((config) => {
  const impersonated = localStorage.getItem("IMPERSONATED_USER");
  const regularUser = localStorage.getItem("USER") || localStorage.getItem("user");

  const activeSession = impersonated ? JSON.parse(impersonated) : (regularUser ? JSON.parse(regularUser) : null);

  if (activeSession?.token) {
    config.headers.Authorization = `Bearer ${activeSession.token}`;
  }

  return config;
}, (error) => Promise.reject(error));


// 2. Add a Response Interceptor to handle the 401s we just configured in Spring
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized! Redirecting to login...");
      // Optional: Clear local storage and redirect if token is expired
      // localStorage.removeItem("USER");
      // window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export default api;