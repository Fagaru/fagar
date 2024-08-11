"use client";

import { format } from "date-fns";

import { RegionClient } from "./components/client";
import getRegions from "@/services/getRegions";
import { useEffect, useState } from "react";
import { Region } from "@/types/region";
import toast from "react-hot-toast";

const RegionsPage = () => {
    // const regions = await getRegions({});

    // const formattedRegions = regions

    const [regions, setRegions] = useState<Region[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const fetchData = async () => {
        try {
            const fetchedRegions = await getRegions({});
            setRegions(fetchedRegions);
        } catch (err) {
            setError("Failed to fetch region data");
            toast.error("Failed to fetch region data");
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

    const formattedRegions = regions.map((item: Region) => ({
        _id: item._id,
        label: item.label,
        createdAt: format(new Date(item.createdAt), "MMMM do, yyyy")
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <RegionClient data={formattedRegions}/>
            </div>
        </div>
    );
}

export default RegionsPage;