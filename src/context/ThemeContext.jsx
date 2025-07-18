import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const getInitialTheme = () => {
    if (typeof window === "undefined") return "light";
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

const getInitialColor = () => {
    return localStorage.getItem("accentColor") || "blue";
};

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(getInitialTheme);
    const [accentColor, setAccentColor] = useState(getInitialColor);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        document.documentElement.dataset.theme = accentColor;
        localStorage.setItem("accentColor", accentColor);
    }, [accentColor]);

    return (
        <ThemeContext.Provider
            value={{ theme, setTheme, accentColor, setAccentColor }}
        >
            {children}
        </ThemeContext.Provider>
    );
}
