"use client";

import { format } from "date-fns";

import { SubscriptionClient } from "./components/client";
import getSubscriptions from "@/services/getSubscriptions";
import { Subscription } from "@/types/subscription";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SubscriptionsPage = () => {

    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const fetchData = async () => {
        try {
            const fetchedSubscriptions = await getSubscriptions();
            setSubscriptions(fetchedSubscriptions);
        } catch (err) {
            setError("Failed to fetch subscription data");
            toast.error("Failed to fetch subscription data");
        }
        };

        fetchData();
    }, [isMounted]);

    if (!isMounted) {
        return null;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const formattedSubscriptions = subscriptions.map((item: Subscription) => ({
        _id: item._id,
        label: item.label,
        createdAt: format(new Date(item.createdAt), "MMMM do, yyyy")
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SubscriptionClient data={formattedSubscriptions}/>
            </div>
        </div>
    );
}

export default SubscriptionsPage;