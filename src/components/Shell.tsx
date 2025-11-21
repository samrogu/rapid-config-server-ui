
'use client';

import React, { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import {
    XMarkIcon,
    ChevronDownIcon,
    ArrowLeftOnRectangleIcon,
    Bars3Icon,
} from '@heroicons/react/24/outline';
import { navItems } from './navigation';
import Breadcrumb from './Breadcrumb';
import { useLayout } from '@/contexts/LayoutContext';
import { useAuth } from '@/contexts/AuthContext';
import { NavItem } from '@/types/navigation';

const NavLink = ({ item }: { item: NavItem }) => {
    const pathname = usePathname();
    const [isSubMenuOpen, setSubMenuOpen] = useState(false);

    const isParentActive = item.subItems && item.subItems.some((sub: NavItem) => sub.href && pathname.startsWith(sub.href));
    const isActive = item.href && pathname.startsWith(item.href);

    if (item.subItems) {
        return (
            <div>
                <button
                    onClick={() => setSubMenuOpen(!isSubMenuOpen)}
                    className={`flex items-center w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 ${isParentActive ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                        }`}
                >
                    {item.icon}
                    <span className="ml-3 flex-1">{item.label}</span>
                    <ChevronDownIcon
                        className={`h-5 w-5 transition-transform duration-200 ${isSubMenuOpen ? 'rotate-180' : ''}`}
                    />
                </button>
                <Transition
                    show={isSubMenuOpen}
                    enter="transition-all duration-200 ease-out"
                    enterFrom="opacity-0 -translate-y-2"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition-all duration-200 ease-in"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-2"
                >
                    <div className="mt-1 ml-4 pl-4 border-l border-gray-700/50">
                        {item.subItems.map((subItem: NavItem) => (
                            <NavLink key={subItem.label} item={subItem} />
                        ))}
                    </div>
                </Transition>
            </div>
        );
    }

    // This should not happen in practice since items without subItems should have href
    if (!item.href) {
        return null;
    }

    if (!item.href) {
        return null;
    }

    return (
        <Link
            href={item.href}
            className={`flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                }`}
        >
            {item.icon}
            <span className="ml-3">{item.label}</span>
        </Link>
    );
};

const SidebarContent = ({ handleLogout }: { handleLogout: () => void }) => {
    const [username, setUsername] = useState('User');
    const [userRole, setUserRole] = useState('User');
    const { isAdmin } = useAuth();

    useEffect(() => {
        try {
            const userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                const parsed = JSON.parse(userInfo);
                setUsername(parsed.username || 'User');
                setUserRole(parsed.admin ? 'Administrator' : 'User');
            }
        } catch (error) {
            console.error('Error loading user info:', error);
        }
    }, []);

    // Filtrar items de navegación según permisos
    const filterNavItems = (items: NavItem[]): NavItem[] => {
        return items.filter(item => {
            // Si el item requiere admin y el usuario no es admin, no mostrarlo
            if (item.adminOnly && !isAdmin) {
                return false;
            }

            // Si tiene subitems, filtrarlos también
            if (item.subItems) {
                const filteredSubItems = filterNavItems(item.subItems);
                // Si no quedan subitems después del filtro, no mostrar el item padre
                if (filteredSubItems.length === 0) {
                    return false;
                }
                // Actualizar los subitems con los filtrados
                item.subItems = filteredSubItems;
            }

            return true;
        });
    };

    const visibleNavItems = filterNavItems([...navItems]);

    return (
        <div className="flex flex-col h-full bg-gradient-to-br from-blue-900 to-gray-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className={`p-4 flex items-center justify-between relative z-10`}>
                <Link href="/organizations">
                    <Image
                        src="/RapidConfigLogo.png"
                        alt="Rapid Config"
                        width={150}
                        height={40}
                        style={{ height: 'auto' }}
                        priority
                    />
                </Link>
            </div>
            <nav className="flex-1 p-2 space-y-2 overflow-y-auto relative z-10">
                {visibleNavItems.map((item) => (
                    <NavLink key={item.label} item={item} />
                ))}
            </nav>
            <div className="p-2 border-t border-gray-700/50 relative z-10">
                <div className={`p-2 rounded-lg bg-gray-900/50 backdrop-blur-xl border border-gray-800`}>
                    <div className="flex items-center">
                        <Image
                            src="/UserAvatar.png"
                            alt="User Avatar"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <div className="ml-3 min-w-0 flex-1">
                            <p className="text-sm font-semibold text-white truncate">{username}</p>
                            <p className="text-xs text-gray-400 truncate">{userRole}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="ml-2 p-2 text-gray-400 hover:text-red-400 transition-colors rounded-full hover:bg-gray-800/50"
                        >
                            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface ShellProps {
    children: React.ReactNode;
    handleLogout: () => void;
}

const Shell = ({ children, handleLogout }: ShellProps) => {
    const { title, actionButton } = useLayout();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-950 text-gray-200">
            {/* Desktop Sidebar */}
            <aside
                className={`hidden lg:flex flex-col h-screen sticky top-0 w-64`}
            >
                <SidebarContent handleLogout={handleLogout} />
            </aside>

            {/* Mobile Sidebar */}
            <Transition.Root show={mobileOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setMobileOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900/80" />
                    </Transition.Child>
                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setMobileOpen(false)}>
                                        <XMarkIcon className="h-6 w-6 text-white" />
                                    </button>
                                </div>
                                <SidebarContent handleLogout={handleLogout} />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <div className={`flex-1 flex flex-col`}>
                <header className="bg-gray-900/50 backdrop-blur-xl p-4 flex justify-between items-center border-b border-gray-800">
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
                            <h1 className="text-xl font-semibold text-white truncate">{title}</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {actionButton}
                    </div>
                </header>
                <main className="flex-grow p-4 sm:p-6 overflow-auto">
                    <div className="bg-gray-900/50 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-gray-800 shadow-2xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Shell;
