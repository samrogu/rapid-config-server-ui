'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isLoginPage = pathname === '/login';

    if (!token && requireAuth && !isLoginPage) {
      // Si no hay token y la ruta requiere autenticación
      router.push('/login');
    } else if (token && isLoginPage) {
      // Si hay token y estamos en login, redirigir a dashboard
      router.push('/dashboard');
    }
  }, [router, pathname, requireAuth]);

  return <>{children}</>;
}
