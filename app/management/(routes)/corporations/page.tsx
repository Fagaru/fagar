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
import { useAuth } from "@/context/authContext";
import { getUser } from "@/services/getUser";

const CorporationsPage = () => {
  const { user, token } = useAuth();
  const [corporations, setCorporations] = useState<Corporation[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [userName, setUserName] = useState<any>();
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const fetchData = async () => {
      try {
        const [corps, cats, subs, regs, cits, client] = await Promise.all([
          getCorporations({userId : user.id}),
          getCategories(),
          getSubscriptions(),
          getRegions({}),
          getCities({}),
          getUser({userId : user.id}, token)
        ]);
        console.log("Client : ", client);
        setUserName(client);
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

  const filteredData = corporations.filter(item => item.userId !== null && item.userId !== undefined);

  // Format the corporations data
  const formattedCorporations = filteredData.map((item) => ({
    _id: item._id,
    name: item.name,
    isActive: item.isActive,
    mail_pro: item.mail_pro,
    user: userName?.last_name + " " + userName?.first_name,
    category: categoryMap[item.categoryId] || "Catégorie non reconnue",
    tags: item.tags.map((tag) => tag.label || "Tag non reconnu"),
    subscription: subscriptionMap[item.subscription?.subscription] || "Non souscrit",
    region: regionMap[item.address?.regionId] || "Région non reconnue",
    city: cityMap[item.address?.cityId] || "Ville non reconnue",
    createdAt: format(new Date(item.createdAt), 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-16 pt-20 w-full">
        <CorporationsClient data={formattedCorporations} />
      </div>
    </div>
  );
};

export default CorporationsPage;
