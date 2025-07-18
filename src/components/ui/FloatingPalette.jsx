// src/components/ui/FloatingPalette.jsx

import { useContext, useEffect, useRef, useState } from "react";
import ThemeControls from "./ThemeControls";
import { ThemeContext } from "@/context/ThemeContext";
import Button from "./Button";

export default function FloatingPalette() {
    const { accentColor } = useContext(ThemeContext);
    const [open, setOpen] = useState(false);
    const [closing, setClosing] = useState(false);
    const panelRef = useRef(null);

    // Close on click-out or ESC
    useEffect(() => {
        const handleClick = (e) => {
            if (panelRef.current && !panelRef.current.contains(e.target)) {
                triggerClose();
            }
        };
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                triggerClose();
            }
        };
        document.addEventListener("mousedown", handleClick);
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("keydown", handleEsc);
        };
    }, []);

    const triggerClose = () => {
        setClosing(true);
        setTimeout(() => {
            setClosing(false);
            setOpen(false);
        }, 400);
    };

    const handleToggle = () => {
        if (open) {
            triggerClose();
        } else {
            setOpen(true);
        }
    };

    return (
        <div className=" fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2">
            {/* Floating Panel */}
            {open && (
                <div
                    ref={panelRef}
                    className={`p-4 rounded-xl shadow-xl bg-white dark:bg-neutral-900 space-y-4 transition-all w-50 animate__animated ${
                        closing ? "animate__slideOutDown" : "animate__slideInUp"
                    }`}
                >
                    <ThemeControls />
                </div>
            )}

            {/* 🎨 Circular Toggle Button */}
            <Button
                onClick={handleToggle}
                className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full shadow-md transition hover:opacity-90"
                style={{
                    backgroundColor: `hsl(var(--color-primary))`,
                    color: `hsl(var(--color-primary-foreground))`,
                }}
                aria-label="Toggle Theme Palette"
            >
                🎨
            </Button>
        </div>
    );
}
