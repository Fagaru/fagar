"use client";

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/authContext';

interface LogoutProps {
  content: React.ReactNode; // <-- Accept React elements
};

const LogoutButton: React.FC<LogoutProps> = (
  content
) => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const id = user?.id;
      await axios.post(`/api/auth/logout`, {"id": id});
      logout();
      toast.success('Successfully logged out');
      router.push('/auth?tab=login'); // Redirect to login page or homepage
    } catch (error) {
      toast.error('Error logging out');
      console.log("ERROR", error);
    }
  };

  return (
    <Button onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
