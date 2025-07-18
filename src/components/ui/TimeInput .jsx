import { useEffect, useRef } from "react";
import "@/styles/time.css";

export default function TimeInput({ value, onChange, id = "time", label = "" }) {
    const inputRef = useRef(null);

    useEffect(() => {
        const input = inputRef.current;
        if (!input || !value) return;

        const reTime = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
        if (!reTime.test(value)) return;

        const updateClock = () => {
            const minute = Number(value.substring(3, 5));
            const hour = (Number(value.substring(0, 2)) % 12) + minute / 60;

            const styles = getComputedStyle(document.documentElement);
            const primary = styles.getPropertyValue("--color-primary").trim();
            const strokeColor = `hsl(${primary})`;

            const encode = (svg) =>
                `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;

            const face = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'>
                <circle cx='20' cy='20' r='18.5' fill='none' stroke='${strokeColor}' stroke-width='3'/>
                <path d='M20,4 20,8 M4,20 8,20 M36,20 32,20 M20,36 20,32' stroke='${strokeColor}' stroke-width='1'/>
                <circle cx='20' cy='20' r='2' fill='${strokeColor}' stroke='${strokeColor}' stroke-width='2'/>
            </svg>`;

            const hourHand = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'>
                <path d='M18.5,24.5 19.5,8.5 20.5,8.5 21.5,24.5 Z'
                fill='${strokeColor}'
                transform='rotate(${(360 * hour) / 12} 20 20)' />
            </svg>`;

            const minuteHand = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'>
                <path d='M18.5,24.5 19.5,4 20.5,4 21.5,24.5 Z'
                fill='${strokeColor}'
                transform='rotate(${(360 * minute) / 60} 20 20)' />
            </svg>`;

            input.style.backgroundImage = [
                encode(face),
                encode(minuteHand),
                encode(hourHand),
            ].join(", ");
        };

        updateClock();

        const observer = new MutationObserver(() => updateClock());
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class", "data-theme"],
        });

        return () => observer.disconnect();
    }, [value]);

    return (
        <div
            className="glass-time-wrapper 
                bg-[hsl(var(--color-muted)/0.1)] 
                backdrop-blur-[12px] 
                rounded-[0.75rem] 
                border border-[hsl(var(--color-ring)/0.2)] 
                p-3"
        >
            {label && (
                <label
                    htmlFor={id}
                    className=" text-[hsl(var(--color-primary))] dark:text-[hsl(var(--color-muted))] text-sm font-medium mb-1"
                >
                    {label}
                </label>
            )}
            <input
                ref={inputRef}
                type="time"
                id={id}
                name={id}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                className="glass-time-input 
                    text-[hsl(var(--color-text))] 
                    border border-[hsl(var(--color-ring)/0.3)] 
                    bg-transparent 
                    focus:outline 
                    focus:outline-[hsl(var(--color-ring))] 
                    focus:outline-offset-2"
            />
        </div>
    );
}
