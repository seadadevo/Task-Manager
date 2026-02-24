import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ThemeProvider";

const ModeToggle = () => {
    const { theme, setTheme } = useTheme();
    const renderDropMenuContent = (theTheme : string , text : string , icon : React.ReactNode) => {
        return (
                <DropdownMenuItem
                    onClick={() => setTheme(theTheme as any )}
                    className={theme === theTheme ? "font-bold" : ""}
                >
                    {icon}
                    {text}
                </DropdownMenuItem>
        );
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl">
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                {renderDropMenuContent("light", "Light", <Sun className="mr-2 h-4 w-4" />)}
                {renderDropMenuContent("dark", "Dark", <Moon className="mr-2 h-4 w-4" />)}
                {renderDropMenuContent("system", "System", <Monitor className="mr-2 h-4 w-4" />)}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ModeToggle;
