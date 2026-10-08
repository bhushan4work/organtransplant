'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from './api';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  id: number;
  email: string;
  role: string;
  hospital_id: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: any) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  clearError: () => void;
  setError: (msg: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const loadUser = async () => {
    try {
      const data = await api.auth.me();
      setUser(data);
    } catch (err: any) {
      setUser(null);
      // Attempt refresh if me fails
      try {
        await api.auth.refresh();
        const data = await api.auth.me();
        setUser(data);
      } catch (refreshErr) {
        // Refresh failed, session expired
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    // Protected routes check
    if (!loading) {
      if (pathname?.startsWith('/workspace') && !user) {
        // Not logged in, redirect to home
        router.push('/?error=unauthorized');
      }
    }
  }, [user, loading, pathname, router]);

  const login = async (credentials: any) => {
    setError(null);
    try {
      await api.auth.login(credentials);
      await loadUser();
      router.push('/workspace');
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } catch (err) {
      // ignore
    } finally {
      setUser(null);
      router.push('/');
    }
  };

  const refresh = async () => {
    try {
      await api.auth.refresh();
      await loadUser();
    } catch (err: any) {
      setError('Session expired. Please log in again.');
      setUser(null);
      router.push('/?error=expired');
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, refresh, clearError, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
