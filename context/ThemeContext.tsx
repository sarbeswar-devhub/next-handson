"use client"

import { createContext, useContext, useEffect, useState } from "react"


type Theme = "light" | "dark"


type ThemeContextType = {
    theme: Theme
    toggleTheme: () => void
}


export const ThemeContext = createContext<ThemeContextType | null>(null);



export function ThemeProvider({children}: {children: React.ReactNode}) {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window === "undefined") return "light";

        const savedTheme = window.localStorage.getItem("theme");
        if (savedTheme === "light" || savedTheme === "dark") {
            return savedTheme;
        }

        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    });


    function toggleTheme() {
        setTheme((prev) => prev === "light" ? "dark" : "light");
    }

    useEffect(() => {
        // remove all
        document.documentElement.classList.remove("light", "dark");
        // added theme on change
        document.documentElement.classList.add(theme);
        window.localStorage.setItem("theme", theme);

    }, [theme]);


    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}


export function useTheme() {
    
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error (
            "useTheme must be used inside ThemeProvider"
        )
    }

    return context;
}