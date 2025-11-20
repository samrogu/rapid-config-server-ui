
'use client';

import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useLayout } from '@/contexts/LayoutContext';
import Breadcrumb from './Breadcrumb';

interface HeaderProps {
    setMobileOpen: (open: boolean) => void;
}

const Header = ({ setMobileOpen }: HeaderProps) => {
    const { title, actionButton } = useLayout();

    return (
        <header className="p-4 sm:p-6 flex justify-between items-center border-b border-white/10 flex-shrink-0">
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    className="p-2.5 text-gray-400 hover:text-white lg:hidden"
                    onClick={() => setMobileOpen(true)}
                >
                    <Bars3Icon className="h-6 w-6" />
                </button>
                <div>
                    <Breadcrumb />
                    <h1 className="text-2xl font-bold text-white truncate">{title}</h1>
                </div>
            </div>
            <div className="flex items-center gap-4">
                {actionButton}
            </div>
        </header>
    );
};

export default Header;
