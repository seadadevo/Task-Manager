import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/ThemeProvider";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="system" storageKey="task-manager-theme">
                <BrowserRouter>
                    <AppRoutes />
                    <Toaster position="top-center" richColors closeButton />
                </BrowserRouter>
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default App;
