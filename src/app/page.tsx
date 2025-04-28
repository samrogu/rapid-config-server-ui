'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (isAuthenticated) {
      redirect('/dashboard'); // Redirige al dashboard si el usuario está autenticado
    } else {
      redirect('/login'); // Redirige al login si el usuario no está autenticado
    }
  }, []);

  return null; // No se renderiza nada porque se redirige automáticamente
}
