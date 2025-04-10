'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import apiRoutes from '@/apiRoutes'; // Importa las rutas de la API

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(apiRoutes.auth.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const data = await response.json();

      // Guarda el token en localStorage
      localStorage.setItem('token', data.token);

      // Redirige al dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sección izquierda */}
      <div className="hidden lg:flex flex-col justify-between bg-blue-600 text-white p-8 w-1/3">
        <div>
          <Image
            src="/rapidconfigserver.png" // Cambia esto por la imagen rapidconfigserver.png
            alt="Spring Config Logo"
            width={360}
            height={140}
            className="mb-8"
          />
          <p className="text-lg font-medium">
            Manage and streamline your Spring Boot application configurations effortlessly with Rapid Config Server.
          </p>
        </div>
        <div>
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