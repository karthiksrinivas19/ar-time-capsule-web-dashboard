'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { nhost } from '../../../utils/nhost';

type AuthState = 'loading' | 'error' | 'success';

export default function AuthCallback() {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    async function handleAuthCallback() {
      try {
        console.log("Auth callback mounted");
        
        // The Nhost SDK should automatically handle the URL parameters
        // Give it a moment to process the auth
        timeoutId = setTimeout(async () => {
          const isAuthenticated = nhost.auth.isAuthenticated();
          
          if (isAuthenticated) {
            console.log("Authentication successful");
            setAuthState('success');
            timeoutId = setTimeout(() => router.push('/dashboard'), 1500);
          } else {
            throw new Error('Authentication failed. Please try again.');
          }
        }, 1000);
      } catch (err) {
        console.error('Authentication error:', err);
        setError(err instanceof Error ? err.message : 'Authentication failed');
        setAuthState('error');
        timeoutId = setTimeout(() => router.push('/auth'), 3000);
      }
    }

    handleAuthCallback();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [router]);

  const getContent = () => {
    switch (authState) {
      case 'error':
        return (
          <div className="text-center">
            <div className="mb-4 text-red-600">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-red-600">{error}</h2>
            <p className="text-gray-600">Redirecting to login page...</p>
          </div>
        );
      case 'success':
        return (
          <div className="text-center">
            <div className="mb-4 text-green-600">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-green-600">Authentication successful!</h2>
            <p className="text-gray-600">Redirecting to dashboard...</p>
          </div>
        );
      default:
        return (
          <div className="text-center">
            <div className="mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Verifying your identity...</h2>
            <p className="text-gray-600">Please wait while we complete the authentication.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        {getContent()}
      </div>
    </div>
  );
}