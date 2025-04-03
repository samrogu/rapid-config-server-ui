'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulación de autenticación
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isAuthenticated', 'true'); // Guardar autenticación en localStorage
      router.push('/dashboard'); // Redirigir al dashboard
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sección izquierda */}
      <div className="hidden lg:flex flex-col justify-between bg-blue-600 text-white p-8 w-1/3">
        <div>
          <Image
            src="/springconfig.png" // Cambia esto por la imagen springconfig.png
            alt="Spring Config Logo"
            width={120}
            height={40}
            className="mb-8"
          />
            <p className="text-lg font-medium">
            Manage and streamline your Spring Boot application configurations effortlessly with Rapid Config Server.
            </p>
        </div>
        <div>
          <div className="flex items-center gap-4 mb-4">
            <Image
              src="/springconfig.png" // Cambia esto por la imagen springconfig.png
              alt="User Avatar"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <p className="font-semibold">Samuel Guardado</p>
              <p className="text-sm">CTO, SaguroDev</p>
            </div>
          </div>
          <p className="text-sm">
            Copyright © 2025 <span className="font-semibold">SaguroDev</span>
          </p>
        </div>
      </div>

      {/* Sección derecha */}
      <div className="flex flex-col justify-center items-center flex-1 bg-gray-50 p-8">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome back!</h1>
          <p className="text-sm text-gray-800 mb-6">
            Please enter your credentials to sign in!
          </p>

          {/* Formulario */}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-900 mb-1">
                User Name
              </label>
              <input
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-900 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Sign In
            </button>
          </form>

          <p className="text-sm text-center text-gray-800 mt-6">
            Don’t have an account yet?{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}