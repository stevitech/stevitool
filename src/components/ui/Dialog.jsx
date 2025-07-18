import { cn } from "@/lib/cn";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function Dialog({
    open,
    onClose,
    children,
    className,
    size = "md",
    showClose = true,
    title,
    description,
    footer,
    ...props
}) {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose?.();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!open) return null;

    const sizeMap = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-2xl",
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div
                className={cn(
                    "relative w-full rounded-lg bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))]shadow-lg",
                    "animate-fade-slide max-h-[90vh] overflow-y-auto",
                    sizeMap[size],
                    className
                )}
                {...props}
            >
                {showClose && (
                    <button
                        onClick={onClose}
                        className="absolute right-3 top-3 text-[hsl(var(--color-muted-foreground))] hover:opacity-75 transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}

                {(title || description) && (
                    <div className="px-6 pt-6">
                        {title && (
                            <h2 className="text-lg font-semibold text-[hsl(var(--color-foreground))]">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="text-sm text-[hsl(var(--color-foreground))]/90 mt-1">
                                {description}
                            </p>
                        )}
                    </div>
                )}

                <div className="px-6 py-4">{children}</div>

                {footer && (
                    <div className="flex justify-end gap-2 px-6 pb-6 pt-2">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
