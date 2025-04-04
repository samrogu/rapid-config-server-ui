'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Obtiene la ruta actual

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Eliminar autenticación
    router.push('/login'); // Redirigir al login
  };

  // Si estamos en la página de login, no renderizamos el Layout
  if (pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-blue-600 w-64 hidden lg:block shadow-md">
        <div className="p-6">
          {/* Logo */}
          <Image
            src="/baserapidconfigserver.png" // Cambia esto por el logo de tu aplicación
            alt="Logo"
            width={220}
            height={80}
            className="mb-8"
          />

          {/* Navigation */}
          <nav>
            <h2 className="text-sm font-bold text-white uppercase mb-4">Apps</h2>
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  href="/dashboard"
                  className="flex items-center p-2 text-white rounded-lg hover:bg-blue-700 hover:text-white group"
                >
                  <svg
                    className="w-5 h-5 text-white transition duration-75 group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/organizations"
                  className="flex items-center p-2 text-white rounded-lg hover:bg-blue-700 hover:text-white group"
                >
                  <svg
                    className="w-5 h-5 text-white transition duration-75 group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                  </svg>
                  <span className="ms-3">Organizations</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/applications"
                  className="flex items-center p-2 text-white rounded-lg hover:bg-blue-700 hover:text-white group"
                >
                  <svg
                    className="w-5 h-5 text-white transition duration-75 group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0Zm0 18.182c-4.518 0-8.182-3.664-8.182-8.182S5.482 1.818 10 1.818 18.182 5.482 18.182 10 14.518 18.182 10 18.182Zm0-13.636a1.364 1.364 0 1 0 0 2.727 1.364 1.364 0 0 0 0-2.727Zm1.818 9.09H8.182v-1.818h.909v-2.727h-.909V9.09h2.727v4.545h.909v1.818Z" />
                  </svg>
                  <span className="ms-3">Applications</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Rapid Config Server</h1>
          <div className="relative">
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Image
                src="/springconfig.png" // Cambia esto por la imagen del usuario
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-white">Admin</span>
            </div>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Children Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}