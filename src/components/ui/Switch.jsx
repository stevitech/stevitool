import { useState } from "react";
import { cn } from "@/lib/cn";

export default function Switch({ checked, onChange, className, ...props }) {
    const [isOn, setIsOn] = useState(checked || false);

    const toggle = () => {
        setIsOn(!isOn);
        onChange?.(!isOn);
    };

    return (
        <button
            type="button"
            role="switch"
            aria-checked={isOn}
            onClick={toggle}
            className={cn(
                className,
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors",
                isOn
                    ? "bg-[hsl(var(--color-primary))]"
                    : "bg-[hsl(var(--color-muted-foreground)/0.3)]"
            )}
            {...props}
        >
            <span
                className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                    isOn ? "translate-x-6" : "translate-x-1"
                )}
            />
        </button>
    );
}
