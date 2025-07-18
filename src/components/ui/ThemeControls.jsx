import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import ModeToggle from "./ModeToggle";
import ColorSelector from "./ColorSelector";

export default function ThemeControls() {
    const { theme } = useContext(ThemeContext);

    const themeLabel = theme === "light" ? "Light Mode" : "Dark Mode";

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-sm font-normal">{themeLabel}</span>
                <ModeToggle />
            </div>
            <div>
                <p className="text-sm font-normal mb-1">Your style 😊</p>
                <ColorSelector />
            </div>
        </div>
    );
}
