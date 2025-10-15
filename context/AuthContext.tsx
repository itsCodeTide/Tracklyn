import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  signup: (fullName: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, pass: string) => {
    // Mock login logic. In a real app, this would be an API call.
    console.log('Logging in with', email, pass);
    if (email && pass) {
      setUser({
        uid: 'mock-uid-123',
        fullName: 'Gamer One',
        email: email,
        avatarUrl: `https://api.dicebear.com/8.x/bottts/svg?seed=${email}`
      });
    }
  };
  
  const signup = async (fullName: string, email: string, pass: string) => {
    // Mock signup logic.
    console.log('Signing up with', fullName, email, pass);
     if (fullName && email && pass) {
      setUser({
        uid: 'mock-uid-123',
        fullName: fullName,
        email: email,
        avatarUrl: `https://api.dicebear.com/8.x/bottts/svg?seed=${email}`
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = { user, login, signup, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};