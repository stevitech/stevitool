import { cn } from "@/lib/cn";

export default function Card({
    children,
    className,
    shadow = true,
    hover = false,
    variant = "default",
    ...props
}) {
    const variants = {
        default:
            "bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))]",
        muted: "bg-[hsl(var(--color-muted))] text-[hsl(var(--color-muted-foreground))]",
        glass: "bg-white/10 backdrop-blur-md border border-white/10",
    };

    return (
        <div
            className={cn(
                "rounded-lg p-4 transition-all",
                shadow && "shadow-md dark:shadow-lg",
                hover && "hover:shadow-lg hover:scale-[1.01]",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
