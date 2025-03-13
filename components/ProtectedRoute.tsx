'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const currentPath = window.location.pathname;
      const returnPath = currentPath === '/auth' ? '/' : currentPath;
      const searchParams = new URLSearchParams();
      searchParams.set('returnTo', returnPath);
      
      router.replace(`/auth?${searchParams.toString()}`);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div aria-hidden="true" className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/50 rounded-full" />
      </div>
    );
  }

  return children;
}