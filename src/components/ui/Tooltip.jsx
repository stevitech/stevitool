import React, { useState, useRef, useEffect } from "react";

export default function Tooltip({
    children,
    label,
    position = "right",
    className = "",
}) {
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const ref = useRef();

    useEffect(() => {
        const updatePosition = (e) => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();

            if (position === "right" && e) {
                setCoords({ x: e.clientX + 12, y: rect.top });
            } else if (position === "top") {
                setCoords({
                    x: rect.left + rect.width / 2,
                    y: rect.top - 32,
                });
            } else if (position === "bottom") {
                setCoords({
                    x: rect.left + rect.width / 2,
                    y: rect.bottom + 8,
                });
            } else if (position === "left") {
                setCoords({
                    x: rect.left - 12,
                    y: rect.top,
                });
            }
        };

        if (visible && position === "right") {
            window.addEventListener("mousemove", updatePosition);
        } else if (visible) {
            updatePosition();
        }

        return () => {
            window.removeEventListener("mousemove", updatePosition);
        };
    }, [visible, position]);

    return (
        <div
            ref={ref}
            className="relative inline-block w-full"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            {visible && (
                <div
                    className={`fixed z-50 px-2 py-1 text-sm rounded-md shadow-md
      bg-[hsl(var(--color-muted)/0.95)] text-[hsl(var(--color-muted-foreground))]
      border border-[hsl(var(--color-muted-foreground)/0.2)]
      pointer-events-none transition-opacity duration-200 animate-slide-up
      ${className}`}
                    style={{
                        left: coords.x,
                        top: coords.y,
                        transform:
                            position === "top" || position === "bottom"
                                ? "translateX(-50%)"
                                : "none",
                        whiteSpace: "nowrap",
                    }}
                >
                    {label}
                </div>
            )}
        </div>
    );
}
