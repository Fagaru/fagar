"use client";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import { CorporationsClient } from "./components/client";
import { Corporation } from '@/types/corporation';
import getCorporations from "@/services/getCorporations";
import getCategories from "@/services/getCategories";
import getSubscriptions from "@/services/getSubscriptions";
import getRegions from "@/services/getRegions";
import getCities from "@/services/getCities";
import { useEffect, useState } from "react";
import { Category } from "@/types/category";
import { Subscription } from "@/types/subscription";
import { Region } from "@/types/region";
import { City } from "@/types/city";

const CorporationsPage = () => {
  const [corporations, setCorporations] = useState<Corporation[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
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
        const [corps, cats, subs, regs, cits] = await Promise.all([
          getCorporations({}),
          getCategories(),
          getSubscriptions(),
          getRegions({}),
          getCities({})
        ]);

        setCorporations(corps);
        setCategories(cats);
        setSubscriptions(subs);
        setRegions(regs);
        setCities(cits);
      } catch (err) {
        setError("Failed to fetch corporation data");
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

  // Create mappings of IDs to labels
  const categoryMap = categories.reduce((acc: Record<string, string>, category) => {
    acc[category._id] = category.label;
    return acc;
  }, {});

  const subscriptionMap = subscriptions.reduce((acc: Record<string, string>, subscription) => {
    acc[subscription._id] = subscription.label;
    return acc;
  }, {});

  const regionMap = regions.reduce((acc: Record<string, string>, region) => {
    acc[region._id] = region.label;
    return acc;
  }, {});

  const cityMap = cities.reduce((acc: Record<string, string>, city) => {
    acc[city._id] = city.label;
    return acc;
  }, {});

  // Format the corporations data
  const formattedCorporations = corporations.map((item) => ({
    _id: item._id,
    name: item.name,
    isActive: item.isActive,
    isSuspended: item.isSuspended,
    user: item.userId || "Utilisateur inconnu",
    category: categoryMap[item.categoryId] || "Catégorie non reconnue",
    tags: item.tags.map((tag) => tag.label || "Tag non reconnu"),
    subscription: subscriptionMap[item.subscription?.subscription] || "Non souscrit",
    region: regionMap[item.address?.regionId] || "Région non reconnue",
    city: cityMap[item.address?.cityId] || "Ville non reconnue",
    createdAt: format(new Date(item.createdAt), 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-16 pt-20">
        <CorporationsClient data={formattedCorporations} />
      </div>
    </div>
  );
};

export default CorporationsPage;
