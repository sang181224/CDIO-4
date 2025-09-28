import axios from "axios";

const apiService = axios.create({
  baseURL: "https://localhost:44332/api",
});

// interceptor (tự động gắn token nếu có)
apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiService;
