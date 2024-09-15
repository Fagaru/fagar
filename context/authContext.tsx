"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';

interface AuthContextProps {
  user: any;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: any) => void;
  token: string;
  setToken: (token: any) => void;
  checkAuthStatus: () => void;
  checkTokenExp: () => void;
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
      const storedUser: any = sessionStorage.getItem('user');
      const storedToken: any = sessionStorage.getItem('token');
      const userInfo =  JSON.parse(storedUser);
      setIsAuthenticated(!!storedToken);
      setUser(userInfo);
      setToken(storedToken);
    }
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const storedUser: any = sessionStorage.getItem('user');
    const storedToken: any = sessionStorage.getItem('token');
    const userInfo =  JSON.parse(storedUser);
    setIsAuthenticated(!!storedToken);
    setUser(userInfo);
    setToken(storedToken);
  }

  // Check if token is valid
  const checkTokenExp = useCallback(() => {
    console.log("checkTokenExp", token)
    
    if (!token) {
      // Si le token n'existe pas (peut-être parce qu'il est en cours de chargement), on attend.
      return;
    }
    try {
      if (token) {
        const decoded: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          logout()
          router.push('/auth?tab=login')
        } else {
          setIsAuthenticated(true);
        }
      }
    }
    catch(error) {
      // En cas d'erreur lors du décodage du token, déconnexion et redirection vers la page de connexion
      console.error("Error decoding token:", error);
      logout();
      router.push('/auth?tab=login');
    }
  }, [token]);

  useEffect(() => {
    checkTokenExp();

    // Set an interval to check the token status periodically
    const intervalId = setInterval(() => {
      checkTokenExp();
    }, 5 * 60 * 1000); // every 5 minutes

    return () => clearInterval(intervalId);
  }, [token]);

  const logout = async () => {
    try {
      sessionStorage.removeItem('token'); // Remove user data from cookies
      sessionStorage.removeItem('user'); // Remove user data from cookies
      setUser(null);
      setIsAuthenticated(false);
      setToken(null);
    } catch (e) {
      toast.error('Error logging out');
      console.log("ERROR", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser,isAuthenticated, setIsAuthenticated, token, setToken, checkAuthStatus, checkTokenExp, logout }}>
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