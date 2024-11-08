import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { getCookie, setCookie } from "../utils/cookieUtils"; 

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASEURL, 
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    const token = getCookie("accessToken"); 
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig; 

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await apiClient.post("/auth/refresh-token");
        const newAccessToken = response.data.accessToken;

        setCookie("accessToken", newAccessToken, { httpOnly: true }); 
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        
        processQueue(null, newAccessToken);
        return apiClient(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
