'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { LayoutProvider } from '@/contexts/LayoutContext';
import { AuthProvider } from '@/contexts/AuthContext';
import Shell from '@/components/Shell';

const DashboardContent = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        router.push('/login');
    };

    return (
        <Shell handleLogout={handleLogout}>
            {children}
        </Shell>
    );
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <LayoutProvider>
                <DashboardContent>{children}</DashboardContent>
            </LayoutProvider>
        </AuthProvider>
    );
}
