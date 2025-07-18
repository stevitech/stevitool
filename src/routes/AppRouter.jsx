// src/AppRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import AdminLayout from "@/layout/AdminLayout";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminSettings from "@/pages/admin/AdminSettings";

const AppRouter = () => {
    return (
        <Routes>
            {/* Public Site */}
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin Login */}
            {/* <Route path="/admin/login" element={<AdminLogin />} /> */}

            {/* Admin Panel Layout */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
