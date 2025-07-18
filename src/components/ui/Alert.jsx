import { cn } from "@/lib/cn";
import { AlertTriangle, Info, CheckCircle2, XCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

const icons = {
    info: Info,
    success: CheckCircle2,
    warning: AlertTriangle,
    error: XCircle,
};

export default function Alert({
    variant = "info",
    title,
    message,
    className,
    fullWidth = true,
    centered = false,
    dismissible = true,
    autoDismiss = null, // seconds
    banner = false,
    icon, // override icon
    cookieKey = null, // if set, stores dismissal in localStorage
    ...props
}) {
    const [visible, setVisible] = useState(() => {
        if (cookieKey) {
            return localStorage.getItem(cookieKey) !== "true";
        }
        return true;
    });

    useEffect(() => {
        if (autoDismiss) {
            const timer = setTimeout(() => handleClose(), autoDismiss * 1000);
            return () => clearTimeout(timer);
        }
    }, [autoDismiss]);

    const handleClose = () => {
        if (cookieKey) {
            localStorage.setItem(cookieKey, "true");
        }
        setVisible(false);
    };

    if (!visible) return null;

    const Icon = icon ?? icons[variant] ?? Info;

    const base =
        "relative flex items-start gap-3 rounded-md p-4 text-sm shadow-sm animate-fade-slide";

    const variants = {
        info: "bg-[hsl(var(--color-primary)/0.15)] text-[hsl(var(--color-primary))]",
        success:
            "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200",
        warning:
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200",
        error: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200",
    };

    const layout = cn(
        fullWidth ? "w-full" : "inline-block",
        centered && "mx-auto",
        banner &&
            "fixed bottom-0 inset-x-0 z-40 rounded-none border-t px-6 py-4 text-center"
    );

    return (
        <div className={cn(base, variants[variant], layout, className)} {...props}>
            {!banner && icon !== null && (
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
            )}
            <div className="flex-1">
                {title && <p className="font-semibold">{title}</p>}
                {message && <p>{message}</p>}
            </div>
            {dismissible && (
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-inherit hover:opacity-70 transition"
                >
                    <X className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}
