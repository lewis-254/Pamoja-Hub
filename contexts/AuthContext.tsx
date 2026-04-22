'use client';

import React, { createContext, useContext, useState } from 'react';

type UserRole = 'citizen' | 'cso';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, _password: string, role?: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  function login(email: string, _password: string, role: UserRole = 'citizen') {
    setUser({
      id: role === 'citizen' ? 'citizen-001' : 'cso-001',
      name: role === 'citizen' ? 'Jane Muthoni' : 'Hope for Tomorrow Foundation',
      email,
      role,
    });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
