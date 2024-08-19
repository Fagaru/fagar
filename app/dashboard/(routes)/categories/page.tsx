"use client";

import { format } from "date-fns";

import { CategoryClient } from "./components/client";
import { Category } from '@/types/category';
import getCategories from "@/services/getCategories";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CategoriesPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const fetchData = async () => {
        try {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories);
        } catch (err) {
            setError("Failed to fetch category data");
            toast.error("Failed to fetch category data");
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

    const formattedCategories = categories.map((item: Category) => ({
        _id: item._id,
        label: item.label,
        createdAt: format(new Date(item.createdAt), "MMMM do, yyyy")
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-16 pt-20">
                <CategoryClient data={formattedCategories}/>
            </div>
        </div>
    );
}

export default CategoriesPage;