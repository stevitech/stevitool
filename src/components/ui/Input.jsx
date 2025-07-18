// src/components/ui/Input.jsx
import { cn } from "@/lib/cn";

export default function Input({ type = "text", className, ...props }) {
    const base = "transition-colors focus:outline-none";

    const sharedInputStyles = cn(
        "px-4 py-2 rounded border text-sm",
        "bg-white dark:bg-neutral-900 text-black dark:text-white",
        "placeholder:text-[hsl(var(--color-placeholder))] dark:placeholder:text-[hsl(var(--color-placeholder-dark))]",
        "border-[hsl(var(--color-muted-foreground)/0.3)]",
        "focus:ring-2 focus:ring-[hsl(var(--color-ring))] focus:border-transparent"
    );

    const accentable = "accent-[hsl(var(--color-primary))]";

    let finalClass = base;

    if (type === "checkbox" || type === "radio") {
        finalClass = cn(base, "w-auto inline-block ", accentable);
    } else if (type === "file") {
        finalClass = cn(
            base,
            sharedInputStyles,
            "!text-[hsl(var(--color-placeholder))] dark:text-[hsl(var(--color-placeholder-dark))]",
            "file:text-white file:bg-[hsl(var(--color-primary))] "
        );
    } else {
        finalClass = cn(base, sharedInputStyles);
    }

    return <input type={type} className={cn(className, finalClass)} {...props} />;
}
