import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ModeToggle() {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="cursor-pointer p-2 rounded transition text-[hsl(var(--color-primary))] hover:text-[hsl(var(--color-primary))]/80"
        >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}
