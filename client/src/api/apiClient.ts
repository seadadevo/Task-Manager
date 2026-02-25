import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

const myApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, 
});

// Request interceptor 
myApi.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor 

myApi.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalReq = error.config;

    if (error.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;

      try {
        const data: any = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );
        const { user } = useAuthStore.getState();
        if (user) {
          useAuthStore.getState().setAuth(user, data.accessToken);
        }

        originalReq.headers.Authorization = `Bearer ${data.accessToken}`;
        return myApi(originalReq);
      } catch {
        useAuthStore.getState().logout();
        toast.error("Session expired. Please log in again.");
        return Promise.reject(
          new Error("Session expired."),
        );
      }
    }

    const errorMessage = error.response?.data?.message || "Server error";
    return Promise.reject(new Error(errorMessage));
  },
);

export default myApi;
