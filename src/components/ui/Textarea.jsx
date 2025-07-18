import { cn } from "@/lib/cn";

export default function Textarea({ className, ...props }) {
    const base = "transition-colors focus:outline-none";

    const sharedInputStyles = cn(
        "px-4 py-2 rounded border text-sm",
        "bg-white dark:bg-neutral-900 text-black dark:text-white",
        "placeholder:text-[hsl(var(--color-placeholder))] dark:placeholder:text-[hsl(var(--color-placeholder-dark))]",
        "border-[hsl(var(--color-muted-foreground)/0.3)]",
        "focus:ring-2 focus:ring-[hsl(var(--color-ring))] focus:border-transparent"
    );

    const finalClass = cn(base, sharedInputStyles, className);

    return <textarea className={finalClass} {...props} />;
}
