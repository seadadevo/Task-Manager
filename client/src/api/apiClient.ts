import axios from "axios";

const myApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

myApi.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

myApi.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        const originalReq = error.config;

        if (error.response?.status === 401 && !originalReq._retry) {
            originalReq._retry = true;

            try {
                await myApi.get(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, {
                    withCredentials: true,
                });
                return myApi(originalReq);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        const errorMessage = error.response?.data?.message || "Error in server";
        return Promise.reject(new Error(errorMessage));
    },
);

export default myApi;
