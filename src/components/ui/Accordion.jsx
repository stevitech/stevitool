import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export default function Accordion({ title, children }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full py-3  text-left font-medium text-[hsl(var(--color-text))] hover:text-[hsl(var(--color-primary))] transition"
            >
                {title}
                <ChevronDown
                    className={cn(
                        "w-4 h-4 transition-transform duration-300",
                        open ? "rotate-180" : "rotate-0"
                    )}
                />
            </button>

            <div
                className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="pl-4 pr-4 pb-2">{children}</div>
            </div>
        </div>
    );
}
