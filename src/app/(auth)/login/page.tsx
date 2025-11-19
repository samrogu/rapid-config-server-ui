'use client';

import { useState } from 'react';
import Image from 'next/image';
import apiRoutes from '@/apiRoutes';
import { AuthResponse } from '@/types/auth';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
        throw new Error('Invalid credentials');
      }

      const data: AuthResponse = await response.json();

      // Guardar en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data.userInfo));

      // Forzar un reload de la página para que se actualice el estado
      window.location.href = '/dashboard';
    } catch {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sección izquierda */}
      <div className="hidden lg:flex flex-col justify-between bg-gray-800 text-gray-200 p-8 w-1/3">
        <div>
          <Image
            src="/RapidConfigLogo.png"
            alt="Spring Config Logo"
            width={360}
            height={140}
            className="mb-8"
          />
          <p className="text-lg font-medium text-gray-300">
            Manage and streamline your Spring Boot application configurations effortlessly with Rapid Config Server.
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-400">
            Copyright © 2025 <span className="font-semibold text-gray-300">SaguroDev</span>
          </p>
        </div>
      </div>

      {/* Sección derecha */}
      <div className="flex flex-col justify-center items-center flex-1 bg-gray-900 p-8">
        <div className="max-w-md w-full bg-gray-800 shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold text-gray-200 mb-4">Welcome back!</h1>
          <p className="text-sm text-gray-400 mb-6">
            Please enter your credentials to sign in!
          </p>

          {/* Formulario */}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-300 mb-1">
                User Name
              </label>
              <input
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-gray-200 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-gray-200 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Sign In
            </button>
          </form>

          <p className="mt-2 text-center text-sm text-gray-400">
            Or{' '}
            <a href="#" className="font-medium text-blue-500 hover:text-blue-400">
              contact your administrator
            </a>{' '}
            if you don&apos;t have an account.
          </p>
        </div>
      </div>
    </div>
  );
}