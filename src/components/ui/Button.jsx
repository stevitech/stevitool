import { cn } from "@/lib/cn";
import { Loader } from "lucide-react";

export default function Button({
    children,
    variant = "default",
    size = "md",
    loading = false,
    disabled,
    className,
    ...props
}) {
    const base =
        "inline-flex items-center justify-center gap-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-ring))] disabled:opacity-50 disabled:pointer-events-none";

    const sizes = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };

    const variants = {
        default:
            "bg-[hsl(var(--color-primary))] text-[hsl(var(--color-primary-foreground))] hover:bg-[hsl(var(--color-primary)/0.9)] shadow-md shadow-[0_2px_10px_hsl(var(--color-shadow)/0.2)]",
        outline:
            "border border-[hsl(var(--color-primary))] text-[hsl(var(--color-primary))] hover:bg-[hsl(var(--color-primary)/0.1)]",
        secondary:
            "bg-[hsl(var(--color-muted))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted)/0.8)]",
        destructive: "bg-red-600 text-white hover:bg-red-700", // Uses native red, you can theme it later
        ghost: "text-[hsl(var(--color-primary))] hover:bg-[hsl(var(--color-primary)/0.08)]",
    };

    return (
        <button
            className={cn(base, sizes[size], variants[variant], className)}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <Loader className="w-4 h-4 animate-spin" />}
            {children}
        </button>
    );
}
