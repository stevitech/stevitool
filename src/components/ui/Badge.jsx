import { cn } from "@/lib/cn";

export default function Badge({ children, variant = "default", className }) {
    const base =
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold";

    const variants = {
        default:
            "bg-[hsl(var(--color-primary))] text-[hsl(var(--color-primary-foreground))]",
        secondary:
            "bg-[hsl(var(--color-muted))] text-[hsl(var(--color-muted-foreground))]",
        outline:
            "border border-[hsl(var(--color-primary))] text-[hsl(var(--color-primary))]",
        destructive: "bg-red-600 text-white",
    };

    return (
        <span className={cn(base, variants[variant], className)}>{children}</span>
    );
}
