'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { UserInfo } from '@/types/auth';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado para el menú lateral
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [activePanel, setActivePanel] = useState<string | null>(null); // Estado para el panel deslizable
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [currentDate, setCurrentDate] = useState<string>('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        setUserInfo(parsedUserInfo);
        console.log('User Info loaded:', parsedUserInfo); // Debug log
      }
    } catch (error) {
      console.error('Error loading user info:', error);
    }

    // Agregar event listener para storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userInfo' && e.newValue) {
        setUserInfo(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    );
  }, []);

  const handleLogout = () => {
    setUserInfo(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    router.push('/login');
  };

  // Agregar función para manejar el click del logo
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  // Función para manejar el click en el botón hamburguesa
  const handleMenuToggle = () => {
    if (activePanel) {
      setIsPanelOpen(!isPanelOpen);
    }
  };

  const handleMenuItemClick = (panelName: string) => {
    if (activePanel === panelName) {
      setIsPanelOpen(!isPanelOpen);
    } else {
      setActivePanel(panelName);
      setIsPanelOpen(true);
    }
  };

  // Si estamos en la página de login, no renderizamos el Layout
  if (pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200">
      {/* Sidebar with Panel */}
      <div className="flex h-screen sticky top-0">
        {/* Sidebar */}
        <aside className="bg-gray-800 w-16 flex flex-col shadow-md">
          <div className="p-1 flex items-center justify-center">
            <Link href="#" onClick={handleLogoClick}>
              <Image
                src="/RapidIcon.png"
                alt="Rapid Config Logo"
                width={56}
                height={56}
                className="w-14 h-14 cursor-pointer hover:opacity-80 transition-opacity" 
                priority
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="mt-4">
            <ul className="space-y-4">
              {/* Dashboard Item */}
              <li>
                <button
                  onClick={() => handleMenuItemClick('Dashboard')}
                  className="flex items-center justify-center p-2 text-gray-200 rounded-lg hover:bg-gray-700 w-full group relative"
                  title="Dashboard"
                >
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                  <span className="absolute left-full ml-2 px-2 py-1 bg-gray-700 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible whitespace-nowrap">
                    Dashboard
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMenuItemClick('Organizaciones')}
                  className="flex items-center justify-center p-2 text-gray-200 rounded-lg hover:bg-gray-700 w-full group relative"
                  title="Organizaciones"
                >
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  {/* Tooltip */}
                  <span className="absolute left-full ml-2 px-2 py-1 bg-gray-700 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible whitespace-nowrap">
                    Organizaciones
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMenuItemClick('Settings')}
                  className="flex items-center justify-center p-2 text-gray-200 rounded-lg hover:bg-gray-700 w-full group relative"
                  title="Settings"
                >
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {/* Tooltip */}
                  <span className="absolute left-full ml-2 px-2 py-1 bg-gray-700 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible whitespace-nowrap">
                    Settings
                  </span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Side Panel - Ahora está junto al sidebar */}
        {activePanel && isPanelOpen && (
          <div className="bg-gray-700 w-64 h-full shadow-lg">
            <div className="p-4 border-b border-gray-600">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">{activePanel}</h2>
              </div>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {activePanel === 'Dashboard' && (
                  <>
                    <li>
                      <Link
                        href="/dashboard"
                        className="flex items-center p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-lg"
                      >
                        <svg
                          className="w-5 h-5 mr-2 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                        Overview
                      </Link>
                    </li>
                    {/* <li>
                      <Link
                        href="/dashboard/analytics"
                        className="flex items-center p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-lg"
                      >
                        <svg
                          className="w-5 h-5 mr-2 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Analytics
                      </Link>
                    </li> */}
                  </>
                )}
                {activePanel === 'Organizaciones' && (
                  <>
                    <li>
                      <Link
                        href="/organizations"
                        className="flex items-center p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-lg"
                      >
                        View All Organizations
                      </Link>
                    </li>
                  </>
                )}
                {activePanel === 'Settings' && (
                  <>
                    {/* <li>
                      <Link
                        href="/settings/profile"
                        className="flex items-center p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-lg"
                      >
                        <svg
                          className="w-5 h-5 mr-2 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile Settings
                      </Link>
                    </li> */}
                    <li>
                      <Link
                        href="/settings/security"
                        className="flex items-center p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-lg"
                      >
                        <svg
                          className="w-5 h-5 mr-2 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0l-3 3m3-3l3 3m-3-6v-2m0 0l-3-3m3 3l3-3" />
                        </svg>
                        Security Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/users"
                        className="flex items-center p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-lg"
                      >
                        <svg
                          className="w-5 h-5 mr-2 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Users Management
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/roles"
                        className="flex items-center p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-lg"
                      >
                        <svg
                          className="w-5 h-5 mr-2 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Roles Management
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={handleMenuToggle}
              className="text-xl text-gray-200 hover:text-white"
              title="Toggle Panel"
            >
              {isPanelOpen ? '⟨' : '⟩'}
            </button>
            <h1 className="text-xl font-bold text-white">Rapid Config Server</h1>
            <span className="text-sm text-gray-400">
              {currentDate}
            </span>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-medium">
                  {userInfo?.username ? userInfo.username[0].toUpperCase() : '?'}
                </span>
              </div>
              <span className="text-gray-200">
                {userInfo?.username || 'Loading...'}
              </span>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* User Menu Dropdown */}
            {isUserMenuOpen && userInfo && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-1">
                <div className="px-4 py-2 border-b border-gray-700">
                  <p className="text-sm text-gray-400">Signed in as</p>
                  <p className="text-sm font-medium text-gray-200">{userInfo.username}</p>
                  {userInfo.roles && (
                    <p className="text-xs text-gray-400 mt-1">
                      {userInfo.roles.join(', ')}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow p-6 bg-gray-900">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-400 p-4 mt-auto">
          <div className="container mx-auto">
            <p className="text-sm text-center">
              Copyright © {new Date().getFullYear()}{' '}
              <span className="font-semibold text-gray-300">SaguroDev</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}