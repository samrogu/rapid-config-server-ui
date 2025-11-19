
'use client';

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .3 1.4l.7 1.2c.3.5.1.7-.5.2l-2.7-1.6c-.4-.2-.7-.5-.9-.9L15 19.4c-.5.5-.7.3-.2-.5l1.6-2.7c.2-.4.5-.7.9-.9L19.4 15zM6 15a1.65 1.65 0 0 0-.3 1.4l-.7 1.2c-.3.5-.1.7.5.2l2.7-1.6c.4-.2.7-.5.9-.9L9 19.4c.5.5.7.3.2-.5l-1.6-2.7c-.2-.4-.5-.7-.9-.9L6 15zM12 6.3a1.65 1.65 0 0 0-1.4-.3l-1.2-.7c-.5-.3-.7-.1-.2.5l1.6 2.7c.2.4.5.7.9.9L4.6 9c-.5-.5-.7-.3-.2.5l2.7 1.6c.4.2.7.5.9.9L9 4.6c.5-.5.7-.3.2.5l-1.6 2.7c-.2.4-.5.7-.9-.9L12 6.3z"></path>
  </svg>
);

const LogOutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const navItems = [
  { href: '/dashboard', icon: <GridIcon />, label: 'Dashboard' },
  { href: '/organizations', icon: <GridIcon />, label: 'Organizations' },
  { href: '/applications', icon: <GridIcon />, label: 'Applications' },
];

const adminItems = [
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/roles', label: 'Roles' },
  { href: '/admin/permissions', label: 'Permissions' },
];

const Sidebar = ({ handleLogout }: { handleLogout: () => void; }) => {
  const pathname = usePathname();
  const [username, setUsername] = useState('User');

  useEffect(() => {
    // Load username from localStorage only on client-side
    try {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        const parsed = JSON.parse(userInfo);
        setUsername(parsed.username || 'User');
      }
    } catch (error) {
      console.error('Error loading user info:', error);
    }
  }, []);

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-gray-700">
        <Link href="/organizations" className="block">
          <Image
            src="/RapidConfigLogo.png"
            alt="Rapid Config Server - Security System"
            width={240}
            height={80}
            className="w-full h-auto object-contain"
            priority
          />
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${pathname.startsWith(item.href)
              ? 'bg-gray-700 text-white'
              : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}

        <div className="pt-4 pb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Administration
        </div>
        {adminItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${pathname.startsWith(item.href)
              ? 'bg-gray-700 text-white'
              : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
          >
            <ShieldIcon />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={() => {
            const dropdown = document.getElementById('user-dropdown');
            if (dropdown) {
              dropdown.classList.toggle('hidden');
            }
          }}
          className="flex items-center gap-3 px-3 py-2 bg-gray-700/50 rounded-lg mb-3 w-full hover:bg-gray-700 transition-colors"
        >
          <Image
            src="/UserAvatar.png"
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-medium text-white truncate">
              {username}
            </p>
            <p className="text-xs text-gray-400 truncate">Administrator</p>
          </div>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        <div id="user-dropdown" className="hidden space-y-1">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <SettingsIcon />
            <span>Settings</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white w-full transition-colors"
          >
            <LogOutIcon />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
