import { cn } from "@/lib/cn";

export default function Select({ className, children, ...props }) {
    const base = "transition-colors focus:outline-none appearance-none";

    const sharedInputStyles = cn(
        "px-4 py-2 pr-10 rounded border text-sm",
        "bg-white dark:bg-neutral-900",
        "text-[hsl(var(--color-placeholder))] dark:text-[hsl(var(--color-placeholder-dark))]",
        "placeholder:text-[hsl(var(--color-placeholder))] dark:placeholder:text-[hsl(var(--color-placeholder-dark))]",
        "border border-[hsl(var(--color-muted-foreground)/0.3)]",
        "focus:ring-2 focus:ring-[hsl(var(--color-ring))] focus:border-transparent",
        `bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='hsl(217,10%,40%)'%20viewBox='0%200%2020%2020'%3E%3Cpath%20fill-rule='evenodd'%20d='M10%2014l-6-6h12l-6%206z'%20clip-rule='evenodd'/%3E%3C/svg%3E")]`,
        "bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem]"
    );

    const finalClass = cn(base, sharedInputStyles, className);

    return (
        <div className="relative ">
            <select className={finalClass} {...props}>
                {children}
            </select>
        </div>
    );
}
