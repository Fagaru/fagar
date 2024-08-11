"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface AuthContextProps {
  user: any;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: any) => void;
  token: string;
  setToken: (token: any) => void;
  checkAuthStatus: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>();
  const [isAuthenticated, setIsAuthenticated] = useState<any>();
  const [token, setToken] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for user data in cookies
    const checkAuthStatus = async () => {
      const storedUser: any = localStorage.getItem('user');
      const storedToken: any = localStorage.getItem('token');
      const userInfo =  JSON.parse(storedUser);
      setIsAuthenticated(!!storedToken);
      setUser(userInfo);
      setToken(storedToken);
    }
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const storedUser: any = localStorage.getItem('user');
    const storedToken: any = localStorage.getItem('token');
    const userInfo =  JSON.parse(storedUser);
    setIsAuthenticated(!!storedToken);
    setUser(userInfo);
    setToken(storedToken);
  }

  const logout = async () => {
    try {
      // const id = user.id;
      // console.log("ID LOGOUT", id);
      // await axios.post(`/api/auth/logout`, {"id": id});
      localStorage.removeItem('token'); // Remove user data from cookies
      localStorage.removeItem('user'); // Remove user data from cookies
      setUser(null);
      setIsAuthenticated(false);
      setToken(null);
    } catch (e) {
      toast.error('Error logging out');
      console.log("ERROR", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser,isAuthenticated, setIsAuthenticated, token, setToken, checkAuthStatus, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};