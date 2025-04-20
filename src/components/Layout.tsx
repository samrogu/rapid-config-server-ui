'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [settingsOpen, setSettingsOpen] = useState(false); // Estado para el submenú de Settings
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Eliminar autenticación
    router.push('/login'); // Redirigir al login
  };

  // Si estamos en la página de login, no renderizamos el Layout
  if (pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200">
      {/* Sidebar */}
      <aside className="bg-gray-800 w-64 hidden lg:flex flex-col shadow-md">
        <div className="p-6">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-white mb-8">RC Rapid Config</h1>

          {/* Navigation */}
          <nav>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/organizations"
                  className="flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-700"
                >
                  <svg
                    className="w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                  </svg>
                  <span className="ml-3">Organizations</span>
                </Link>
              </li>
              {/* Settings Menu */}
              <li>
                <button
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  className="flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-700 w-full"
                >
                  <svg
                    className="w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0Zm0 18.182c-4.518 0-8.182-3.664-8.182-8.182S5.482 1.818 10 1.818 18.182 5.482 18.182 10 14.518 18.182 10 18.182Zm0-13.636a1.364 1.364 0 1 0 0 2.727 1.364 1.364 0 0 0 0-2.727Zm1.818 9.09H8.182v-1.818h.909v-2.727h-.909V9.09h2.727v4.545h.909v1.818Z" />
                  </svg>
                  <span className="ml-3">Settings</span>
                  <svg
                    className={`w-4 h-4 ml-auto transform ${
                      settingsOpen ? 'rotate-90' : ''
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
                {settingsOpen && (
                  <ul className="pl-8 mt-2 space-y-2">
                    <li>
                      <Link
                        href="/admin/users"
                        className="flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-700"
                      >
                        <span className="ml-3">Users</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/roles"
                        className="flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-700"
                      >
                        <span className="ml-3">Roles</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="mt-auto p-6">
          <button
            onClick={handleLogout}
            className="flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-700 w-full"
          >
            <svg
              className="w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M3 10a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm9-7a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V4H5v12h6v-2a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8ZM14.707 6.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L16.586 11H9a1 1 0 1 1 0-2h7.586l-1.879-1.879a1 1 0 0 1 0-1.414Z" />
            </svg>
            <span className="ml-3">Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Rapid Config Server</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-700 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </header>

        {/* Children Content */}
        <main className="p-6 bg-gray-900">{children}</main>
      </div>
    </div>
  );
}