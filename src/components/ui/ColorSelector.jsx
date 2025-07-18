import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const COLORS = ["blue", "red", "green", "orange", "lavender"];

export default function ColorSelector() {
    const { accentColor, setAccentColor } = useContext(ThemeContext);

    return (
        <div className="flex items-center gap-2">
            {COLORS.map((color) => (
                <button
                    key={color}
                    onClick={() => setAccentColor(color)}
                    className={`cursor-pointer w-6 h-6 rounded-full ring-offset-2 transition-all duration-200 border-2 border-white dark:border-neutral-700 ${
                        accentColor === color
                            ? "ring-2 ring-[hsl(var(--color-ring))]"
                            : "ring-0"
                    }`}
                    style={{
                        backgroundColor: `hsl(var(--color-primary))`,
                    }}
                    data-theme={color}
                    aria-label={`Set accent color to ${color}`}
                />
            ))}
        </div>
    );
}
