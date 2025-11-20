'use client';

import { useState } from 'react';
import Image from 'next/image';
import apiRoutes from '@/apiRoutes';
import { AuthResponse } from '@/types/auth';
import Input from '@/components/Input';
import { Button } from '@/components/Button';

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
      window.location.href = '/organizations';
    } catch {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      {/* Left Section - Info & Branding */}
      <div className="hidden lg:flex flex-col justify-between lg:w-1/2 bg-gradient-to-br from-blue-900 to-gray-900 p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative z-10">
          <Image
            src="/RapidConfigLogo.png"
            alt="Rapid Config Server Logo"
            width={240}
            height={80}
            className="mb-8"
            priority
          />
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Manage your configurations <br />
            <span className="text-blue-400">with speed and precision.</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-md">
            Streamline your Spring Boot application configurations effortlessly.
            Centralized, secure, and rapid.
          </p>
        </div>
        <div className="relative z-10">
          <p className="text-sm text-gray-400">
            &copy; 2025 <span className="font-semibold text-white">SaguroDev</span>. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-gray-950 p-4 sm:p-8 relative">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <Image
              src="/RapidIcon.png"
              alt="Rapid Config"
              width={64}
              height={64}
              className="mx-auto mb-4 lg:hidden"
            />
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Please enter your credentials to sign in
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-6">
              <Input
                label="Username"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-gray-800/50 border-gray-700 focus:border-blue-500 focus:ring-blue-500/20"
              />

              <div className="space-y-1">
                <Input
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-800/50 border-gray-700 focus:border-blue-500 focus:ring-blue-500/20"
                />
                <div className="flex justify-end">
                  <a href="#" className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full py-2.5 text-base font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200"
              >
                Sign In
              </Button>
            </form>
          </div>

          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <a href="#" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
              Contact administrator
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}