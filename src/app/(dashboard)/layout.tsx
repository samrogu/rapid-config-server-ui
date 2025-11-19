'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { LayoutProvider, useLayout } from '@/contexts/LayoutContext';

// Internal component to consume context
const DashboardContent = ({ children }: { children: React.ReactNode }) => {
    const { title, actionButton } = useLayout();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        router.push('/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-900 text-gray-200">
            <Sidebar handleLogout={handleLogout} />
            <div className="flex-1 flex flex-col">
                <header className="bg-gray-900 p-6 flex justify-between items-center border-b border-gray-800">
                    <h1 className="text-3xl font-bold text-white">{title}</h1>
                    {actionButton}
                </header>
                <main className="flex-grow p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <LayoutProvider>
            <DashboardContent>{children}</DashboardContent>
        </LayoutProvider>
    );
}
