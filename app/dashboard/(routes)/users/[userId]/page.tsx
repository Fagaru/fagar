"use client";
import { getUser4Admin } from "@/services/getUser";
import ProfileForm from "./components/user-form";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import toast from "react-hot-toast";

const UserPage = async ({
    params
}: {
    params: Promise <{userId: string}>
}) => {
    const { token } = useAuth();
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const fetchData = async () => {
        try {
            const fetchedUser = await getUser4Admin({
                userId: (await params).userId
                },
                token
            )
            setUser(fetchedUser);
        } catch (err) {
            setError("Failed to fetch User data");
            toast.error("Failed to fetch User data");
        }
        };

        // if (params.userId !== "new") {
        //     fetchData();   
        // }
        
        }, [isMounted, token]);

    if (!isMounted) {
        return null;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProfileForm initialData={user}/>
            </div>
        </div>
    );
}

export default UserPage;