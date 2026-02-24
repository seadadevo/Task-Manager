import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ModeToggle";

const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b  bg-background/80 backdrop-blur-md">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="flex flex-col">
                            <span className="text-xl font-bold tracking-tight text-foreground">TaskY</span>
                            <span className="text-[10px] font-medium text-muted-foreground uppercase">Manager</span>
                        </div>
                    </Link>

                    <nav className="flex items-center gap-3">

                        <Link to="">
                            <Button className="flex items-center gap-2 rounded-xl bg-gray-900 text-white shadow-md hover:bg-gray-800 hover:shadow-lg transition-all active:scale-95 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
                                <Plus size={18} />
                                <span className="hidden sm:inline">New Task</span>
                            </Button>
                        </Link>

                        {/* Theme Button */}
                        <ModeToggle />

                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
