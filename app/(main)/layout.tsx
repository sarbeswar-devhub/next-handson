import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="flex min-h-screen bg-gray-100 text-gray-900 dark:bg-zinc-900 dark:text-zinc-100">

                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 flex flex-col">

                    {/* Navbar */}
                    <Navbar />

                    {/* Page Content */}
                    <main className="p-6">
                    {children}
                    </main>

                </div>

            </div>
        </>
    )
}