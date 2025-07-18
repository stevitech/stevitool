import React, { useEffect, useState } from "react";
import ModeToggle from "../ui/ModeToggle";
import { PanelLeftClose, PanelRightClose } from "lucide-react";

export default function AdminTopbar({
    isOpen,
    toggleSidebar,
    toggleMobileSidebar,
    mobileOpen,
}) {
    const [delayedIsOpen, setDelayedIsOpen] = useState(isOpen);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDelayedIsOpen(isOpen);
        }, 300); // match sidebar animation duration
        return () => clearTimeout(timeout);
    }, [isOpen]);

    return (
        <header className="z-40 sticky top-0 flex items-center justify-between px-4 py-3  shadow shadow-[hsl(var(--color-shadow))]/10 md:ml-0">
            <div className="flex items-center gap-4">
                {!mobileOpen && (
                    <button
                        onClick={toggleMobileSidebar}
                        className="text-2xl cursor-pointer text-primary md:hidden"
                    >
                        {delayedIsOpen ? (
                            <PanelLeftClose className="text-[hsl(var(--color-primary))] transition-transform duration-300" />
                        ) : (
                            <PanelRightClose className="text-[hsl(var(--color-primary))] transition-transform duration-300" />
                        )}
                    </button>
                )}
                <button
                    onClick={toggleSidebar}
                    className="hidden md:inline-block cursor-pointer text-2xl text-primary"
                >
                    {delayedIsOpen ? (
                        <PanelLeftClose className="text-[hsl(var(--color-primary))] transition-transform duration-300" />
                    ) : (
                        <PanelRightClose className="text-[hsl(var(--color-primary))] transition-transform duration-300" />
                    )}
                </button>
                <h1 className="text-xl font-bold text-primary hidden sm:block ">
                    Admin Panel
                </h1>
            </div>
            <div className="flex px-1 space-x-0.5 items-center text-sm ">
                <p>
                    {`Welcome `}
                    <span className="font-semibold text-[hsl(var(--color-primary))]  capitalize">
                        Admin
                    </span>
                </p>
                <ModeToggle />
            </div>
        </header>
    );
}
