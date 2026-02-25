import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { ThemeProvider } from "./components/ThemeProvider";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";
import myApi from "./api/apiClient";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

const queryClient = new QueryClient();

const AuthInitialize = () => {
    const { setAuth, logout } = useAuthStore();

    const { data, isSuccess, isError } = useQuery({
        queryKey: ["auth-me"],
        queryFn: () => myApi.get("/auth/me"),
        retry: false,
        staleTime: Infinity, 
    });

    useEffect(() => {
        if (isSuccess && data) {
            const token = useAuthStore.getState().accessToken || localStorage.getItem("accessToken");
            if (token) {
                setAuth(data.data.user, token);
            }
        }

        if (isError) {
            logout();
        }
    }, [isSuccess, isError, data, setAuth, logout]);

    return null;
};

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="system" storageKey="task-manager-theme">
                <BrowserRouter>
                    <AuthInitialize />
                    <AppRoutes />
                    <Toaster position="top-center" richColors closeButton />
                </BrowserRouter>
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default App;
