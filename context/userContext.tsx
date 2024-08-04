"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface UserContextProps {
  user: any;
  setUser: (user: any) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    // Check for user data in cookies
    const storedUser: any = localStorage.getItem('user');
    const userInfo =  JSON.parse(storedUser);
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  const logout = async () => {
    try {
      // const id = user.id;
      // console.log("ID LOGOUT", id);
      // await axios.post(`/api/auth/logout`, {"id": id});
      localStorage.removeItem('token'); // Remove user data from cookies
      localStorage.removeItem('user'); // Remove user data from cookies
      setUser(null);
    } catch (e) {
      toast.error('Error logging out');
      console.log("ERROR", e);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};