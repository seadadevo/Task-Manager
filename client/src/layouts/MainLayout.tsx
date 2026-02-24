import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <main className="flex-1 overflow-y-auto p-4">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
