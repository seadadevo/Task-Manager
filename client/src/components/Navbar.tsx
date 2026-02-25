import { Link, useLocation, useNavigate } from "react-router-dom";
import { Plus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ModeToggle";
import { useAuthStore } from "@/store/authStore";
import myApi from "@/api/apiClient";
import { toast } from "sonner";

const Navbar = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuthStore();

    const handleLogout = async () => {
        try {
            await myApi.post("/auth/logout");
        } catch {
            toast.error("Logout failed");
        } finally {
            logout();
            navigate("/login");
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="flex flex-col">
                            <span className="text-xl font-bold tracking-tight text-foreground">TaskY</span>
                            <span className="text-[10px] font-medium text-muted-foreground uppercase">Manager</span>
                        </div>
                    </Link>

                    <nav className="flex items-center gap-3">
                        {isAuthenticated && (
                            <>
                                <Link to="">
                                    <Button className="flex items-center gap-2 rounded-xl bg-gray-900 text-white shadow-md hover:bg-gray-800 hover:shadow-lg transition-all active:scale-95 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
                                        <Plus size={18} />
                                        <span className="hidden sm:inline">New Task</span>
                                    </Button>
                                </Link>

                                <Button
                                    onClick={handleLogout}
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                                    title="Log out"
                                >
                                    <LogOut size={18} />
                                </Button>
                            </>
                        )}

                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
