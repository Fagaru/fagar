"use client";
import { format } from "date-fns";
import { UserClient } from "./components/client";
import { User } from '@/types/user';
import getCities from "@/services/getCities";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import getUsers from "@/services/getUsers";
import { useAuth } from "@/context/authContext";

const UsersPage = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const fetchData = async () => {
      try {
        const fetchedUsers = await getUsers(token);
        setUsers(fetchedUsers);
      } catch (err) {
        setError("Failed to fetch User data");
        toast.error("Failed to fetch User data");
      }
    };

    fetchData();
  }, [isMounted, token]);

  if (!isMounted) {
    return null;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const formattedUsers = users.map((item: User) => ({
    _id: item._id,
    first_name: item.first_name,
    last_name: item.last_name,
    email: item.email,
    phone: item.phone,
    role: item.role,
    lastLogin: format(new Date(item.lastLogin || null), "MMMM do, yyyy"),
    lastLogout: format(new Date(item.lastLogout || null), "MMMM do, yyyy"),
    createdAt: format(new Date(item.createdAt), "MMMM do, yyyy")
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-16 pt-20">
        <UserClient data={formattedUsers} />
      </div>
    </div>
  );
};

export default UsersPage;
