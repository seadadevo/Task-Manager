import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}

interface ThemeContextValue {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}


const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);


const applyThemeToDOM = (theme: Theme) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
        root.classList.add(systemTheme);
    } else {
        root.classList.add(theme);
    }
};



const ThemeProvider = ({
    children,
    defaultTheme = "system",
    storageKey = "task-manager-theme",
}: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem(storageKey) as Theme | null;
        const initial = saved || defaultTheme;
        applyThemeToDOM(initial);
        return initial;
    });

    useEffect(() => {
        applyThemeToDOM(theme);
    }, [theme]);

   
    useEffect(() => {
        if (theme !== "system") return;

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => applyThemeToDOM("system");

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);

    const handleSetTheme = (newTheme: Theme) => {
        localStorage.setItem(storageKey, newTheme);
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};



const useTheme = (): ThemeContextValue => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used inside <ThemeProvider>");
    }
    return context;
};

export { ThemeProvider, useTheme };
export type { Theme };
