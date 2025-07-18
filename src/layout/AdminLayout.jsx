import React, { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">
            <AdminSidebar
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />
            <div className="flex-1 flex flex-col">
                <AdminTopbar
                    isOpen={sidebarOpen}
                    mobileOpen={mobileOpen}
                    toggleSidebar={() => setSidebarOpen((prev) => !prev)}
                    toggleMobileSidebar={() => setMobileOpen((prev) => !prev)}
                />
                <main className="p-6  overflow-y-scroll min-h-screen">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
