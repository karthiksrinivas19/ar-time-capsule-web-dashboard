'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { nhost } from '../utils/nhost';
import { User } from '@nhost/hasura-auth-js';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = nhost.auth.onAuthStateChanged((event, session) => {
      setIsLoading(true);
      if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true);
        setUser(session.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setIsLoading(false);
    });

    // Initial auth check
    const checkAuth = async () => {
      try {
        const isSignedIn = nhost.auth.isAuthenticated();
        if (isSignedIn) {
          setIsAuthenticated(true);
          setUser(nhost.auth.getUser());
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
    return () => {
      unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await nhost.auth.signOut();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};