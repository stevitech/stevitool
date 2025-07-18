import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, UserCog, Settings, LogOut, CircleX } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Tooltip from "@/components/ui/Tooltip";

export default function AdminSidebar({
    isOpen,
    setIsOpen,
    mobileOpen,
    setMobileOpen,
}) {
    const [collapsed, setCollapsed] = useState(!isOpen);
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCollapsed(!isOpen);
        }, 300);
        return () => clearTimeout(timeout);
    }, [isOpen]);

    const navItems = [
        { to: "/admin", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
        { to: "/admin/users", icon: <UserCog size={18} />, label: "Users" },
    ];

    const handleLogout = () => {
        localStorage.removeItem("adminUser");
        toast.success("Logged out");
        navigate("/admin/login");
        if (mobileOpen) setMobileOpen(false);
    };

    return (
        <>
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full z-[100] flex flex-col
        !bg-[var(--color-bg)] border-r border-white/10 backdrop-blur-md 
        shadow-inset-theme transition-all duration-300 ease-in-out 
        ${collapsed ? "w-16" : "w-48"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full "}
        md:translate-x-0 md:relative pointer-events-auto`}
            >
                {/* Logo and Close */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
                    <div className="flex items-center justify-between w-full">
                        <div className="text-xl font-semibold tracking-wide  whitespace-nowrap">
                            {collapsed && !mobileOpen ? (
                                <p className="font-bold pl-2">S</p>
                            ) : (
                                <p className="font-bold">
                                    Stevi
                                    <span className="text-[hsl(var(--color-primary))]">
                                        Tools
                                    </span>
                                </p>
                            )}
                        </div>
                        {mobileOpen && (
                            <button
                                onClick={() => setMobileOpen(false)}
                                className=""
                            >
                                <CircleX className="cursor-pointer text-[hsl(var(--color-muted))] hover:text-[hsl(var(--color-primary))]" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Nav Items */}
                <nav className="mt-4 flex flex-col ">
                    {navItems.map(({ to, icon, label }) =>
                        collapsed && !mobileOpen ? (
                            <Tooltip position="right" key={to} label={label}>
                                <NavLink
                                    to={to}
                                    end={to === "/admin"}
                                    onClick={() =>
                                        mobileOpen && setMobileOpen(false)
                                    }
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-text-secondary)] transition rounded-sm ${
                                            isActive
                                                ? "bg-[hsl(var(--color-primary))] hover:bg-[hsl(var(--color-primary))]/80 text-white"
                                                : "hover:bg-[hsl(var(--color-primary))]/20"
                                        } justify-center`
                                    }
                                >
                                    {icon}
                                </NavLink>
                            </Tooltip>
                        ) : (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === "/admin"}
                                onClick={() => mobileOpen && setMobileOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-text-secondary)] transition rounded-sm ${
                                        isActive
                                            ? "bg-[hsl(var(--color-primary))] hover:bg-[hsl(var(--color-primary))]/80 text-white"
                                            : "hover:bg-[hsl(var(--color-primary))]/20"
                                    } justify-start`
                                }
                            >
                                {icon}
                                <span className="transition-opacity duration-300 ease-in-out opacity-100">
                                    {label}
                                </span>
                            </NavLink>
                        )
                    )}
                </nav>

                {/* Bottom Actions */}
                <div className="mt-auto py-4 border-t border-white/10 flex flex-col gap-3">
                    {collapsed && !mobileOpen ? (
                        <Tooltip label="Settings">
                            <NavLink
                                to="/admin/settings"
                                onClick={() => mobileOpen && setMobileOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-text-secondary)] transition rounded-sm ${
                                        isActive
                                            ? "bg-[hsl(var(--color-primary))] text-white"
                                            : "hover:bg-[hsl(var(--color-primary))]/20"
                                    } justify-center`
                                }
                            >
                                <Settings size={18} />
                            </NavLink>
                        </Tooltip>
                    ) : (
                        <NavLink
                            to="/admin/settings"
                            onClick={() => mobileOpen && setMobileOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-text-secondary)] transition rounded-sm ${
                                    isActive
                                        ? "bg-[hsl(var(--color-primary))] text-white"
                                        : "hover:bg-[hsl(var(--color-primary))]/20"
                                } justify-start`
                            }
                        >
                            <Settings size={18} />
                            <span className="transition-opacity duration-300 ease-in-out opacity-100">
                                Settings
                            </span>
                        </NavLink>
                    )}

                    {collapsed && !mobileOpen ? (
                        <Tooltip
                            className="bg-red-200/90 text-red-500
      border border-red-300/80"
                            label="Logout"
                        >
                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center justify-center px-4 py-2 text-sm text-red-500 hover:text-white hover:bg-red-500/70 transition rounded-sm"
                            >
                                <LogOut size={18} className="flex-shrink-0" />
                            </button>
                        </Tooltip>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 text-sm text-red-500 hover:text-white hover:bg-red-500/70 transition px-4 py-2 rounded-sm "
                        >
                            <LogOut size={18} className="flex-shrink-0" />
                            <span className="transition-opacity duration-300 ease-in-out opacity-100">
                                Logout
                            </span>
                        </button>
                    )}
                </div>
            </aside>

            {/* Backdrop for mobile */}
            {mobileOpen && (
                <div className=" md:hidden" onClick={() => setMobileOpen(false)} />
            )}
        </>
    );
}
