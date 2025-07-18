import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { X, Menu } from "lucide-react";
import { cn } from "@/lib/cn";
import Accordion from "@/components/ui/Accordion";

export default function Sidebar({ position = "right" }) {
    const [open, setOpen] = useState(false);
    const sidebarRef = useRef(null);
    const location = useLocation();

    const toggleSidebar = () => setOpen(!open);
    const closeSidebar = () => setOpen(false);

    const isServicePath = location.pathname.startsWith("/services");
    const isLeft = position === "left";

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") closeSidebar();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                closeSidebar();
            }
        };
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    // Drag to close
    useEffect(() => {
        let startX = null;
        const handleMouseDown = (e) => (startX = e.clientX);
        const handleMouseUp = (e) => {
            if (
                startX !== null &&
                ((isLeft && e.clientX - startX > 80) ||
                    (!isLeft && startX - e.clientX > 80))
            ) {
                closeSidebar();
            }
            startX = null;
        };

        if (open) {
            document.addEventListener("mousedown", handleMouseDown);
            document.addEventListener("mouseup", handleMouseUp);
        }
        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [open, isLeft]);

    // Auto-close on route change
    useEffect(() => {
        closeSidebar();
    }, [location.pathname]);

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className={cn(
                    "md:hidden cursor-pointer fixed top-4 z-51 p-2 rounded-full bg-[hsl(var(--color-primary))] text-white shadow-lg",
                    isLeft ? "left-4" : "right-4"
                )}
                aria-label="Toggle Sidebar"
            >
                {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Overlay */}
            {open && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300" />
            )}

            {/* Sidebar */}
            <aside
                ref={sidebarRef}
                className={cn(
                    "fixed top-0 h-full w-64 z-50 p-6 pt-16 space-y-6",
                    isLeft ? "left-0" : "right-0",
                    "bg-white dark:bg-neutral-900 text-[var(--color-text)] shadow-xl",
                    "transition-transform duration-300 ease-in-out",
                    open
                        ? "translate-x-0"
                        : isLeft
                        ? "-translate-x-full"
                        : "translate-x-full"
                )}
            >
                <nav className="flex flex-col gap-4 pt-10">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            cn(
                                "text-sm font-medium transition-colors cursor-pointer hover:text-[hsl(var(--color-primary))]",
                                isActive && "text-[hsl(var(--color-primary))]"
                            )
                        }
                    >
                        Home
                    </NavLink>

                    <Accordion title="Services" defaultOpen={isServicePath}>
                        <div className="flex flex-col gap-2">
                            <NavLink
                                to="/services/link1"
                                className={({ isActive }) =>
                                    cn(
                                        "text-sm pl-2 py-1 transition-colors cursor-pointer hover:text-[hsl(var(--color-primary))]",
                                        isActive &&
                                            "text-[hsl(var(--color-primary))]"
                                    )
                                }
                            >
                                Link 1
                            </NavLink>
                            <NavLink
                                to="/services/link2"
                                className={({ isActive }) =>
                                    cn(
                                        "text-sm pl-2 py-1 transition-colors cursor-pointer hover:text-[hsl(var(--color-primary))]",
                                        isActive &&
                                            "text-[hsl(var(--color-primary))]"
                                    )
                                }
                            >
                                Link 2
                            </NavLink>
                            <NavLink
                                to="/services/link3"
                                className={({ isActive }) =>
                                    cn(
                                        "text-sm pl-2 py-1 transition-colors cursor-pointer hover:text-[hsl(var(--color-primary))]",
                                        isActive &&
                                            "text-[hsl(var(--color-primary))]"
                                    )
                                }
                            >
                                Link 3
                            </NavLink>
                        </div>
                    </Accordion>

                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            cn(
                                "text-sm font-medium transition-colors cursor-pointer hover:text-[hsl(var(--color-primary))]",
                                isActive && "text-[hsl(var(--color-primary))]"
                            )
                        }
                    >
                        Contact
                    </NavLink>
                </nav>
            </aside>
        </>
    );
}
