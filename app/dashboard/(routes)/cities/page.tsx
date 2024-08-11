"use client";
import { format } from "date-fns";
import { CityClient } from "./components/client";
import { City } from '@/types/city';
import getCities from "@/services/getCities";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const CitiesPage = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const fetchData = async () => {
      try {
        const fetchedCities = await getCities({});
        setCities(fetchedCities);
      } catch (err) {
        setError("Failed to fetch city data");
        toast.error("Failed to fetch city data");
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

  const formattedCities = cities.map((item: City) => ({
    _id: item._id,
    label: item.label,
    createdAt: format(new Date(item.createdAt), "MMMM do, yyyy")
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CityClient data={formattedCities} />
      </div>
    </div>
  );
};

export default CitiesPage;
