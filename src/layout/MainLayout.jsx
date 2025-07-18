import { useState } from "react";
import Navbar from "@/components/site/Navbar";
import Sidebar from "@/components/site/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="relative z-10">
            <Navbar onToggleSidebar={() => setIsSidebarOpen(true)} />
            <Sidebar
                position=""
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <main className="p-4 md:p-8 mx-auto pt-20">
                <Outlet />
            </main>
        </div>
    );
}
