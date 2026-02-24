import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
    return (
        <ThemeProvider defaultTheme="system" storageKey="task-manager-theme">
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
