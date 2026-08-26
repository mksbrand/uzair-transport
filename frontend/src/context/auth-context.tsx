'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import { getStoredUser, saveAuthData, clearAuthData } from '../lib/auth';
import { fetchApi } from '../lib/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
  refreshUser: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('uzair_auth_token');
      const storedUser = getStoredUser();
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
      }
      setIsLoading(false);
    }
  }, []);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    saveAuthData(newToken, newUser);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    clearAuthData();
  };

  const refreshUser = async () => {
    if (!token) return;
    const endpoint = user?.role === 'ADMIN' ? '/admin/dashboard' : '/student/profile';
    const res = await fetchApi(endpoint);
    if (res.success && res.data) {
      if (user?.role === 'STUDENT') {
        const updatedUser = { ...user, ...res.data };
        setUser(updatedUser);
        if (typeof window !== 'undefined') {
          localStorage.setItem('uzair_user', JSON.stringify(updatedUser));
        }
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
