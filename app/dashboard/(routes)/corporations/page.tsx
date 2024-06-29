import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import { CorporationsClient } from "./components/client";
import { Corporation } from '@/types/corporation';
import getCorporations from "@/services/getCorporations";
import getTags from "@/services/getTags";
import getCategories from "@/services/getCategories";
import getSubscriptions from "@/services/getSubscriptions";
import getRegions from "@/services/getRegions";
import getCities from "@/services/getCities";

const CorporationsPage = async () => {
  const corporations = await getCorporations({});
  const tags = await getTags();
  const categories = await getCategories();
  const subscriptions = await getSubscriptions();
  const regions = await getRegions({});
  const cities = await getCities({})

  // Create a mapping of category IDs to labels
  const categoryMap = categories.reduce((acc: any, category) => {
    acc[category._id] = category.label;
    return acc;
  }, {});

  console.log("CATEGORIES", categoryMap);

  // Create a mapping of tag IDs to labels
  const tagMap = tags.reduce((acc: any, tag) => {
    acc[tag._id] = tag.label;
    return acc;
  }, {});

  // Create a mapping of subscription IDs to labels
  const subscriptionMap = subscriptions.reduce((acc: any, subscription) => {
    acc[subscription._id] = subscription.label;
    return acc;
  }, {});

  // Create a mapping of region IDs to labels
  const regionMap = subscriptions.reduce((acc: any, region) => {
    acc[region._id] = region.label;
    return acc;
  }, {});

  // Create a mapping of city IDs to labels
  const cityMap = subscriptions.reduce((acc: any, city) => {
    acc[city._id] = city.label;
    return acc;
  }, {});

  // Format the corporations data to include category and tag labels
  const formattedCorporations: any = corporations.map((item) => ({
    _id: item._id,
    name: item.name,
    isActive: item.isActive,
    isSuspended: item.isSuspended,
    user: item.userId || "Utilisateur inconnu",
    category: categoryMap[item.categoryId] || "Catégorie non reconnue",
    tags: item.tags.map((tagId: string) => tagMap[tagId] || "Tag non reconnu"),
    subscription: subscriptionMap[item.subscription?.subscription] || "No souscrit",               //item.subscription,
    region: regionMap[item.address?.regionId] || "Région non reconnue",
    city: cityMap[item.address?.cityId] || "Ville non reconnue",
    createdAt: format(new Date(item.createdAt), 'MMMM do, yyyy'),
  }));

  console.log("formattedCorporations DAta", formattedCorporations);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CorporationsClient data={formattedCorporations} />
      </div>
    </div>
  );
};

export default CorporationsPage;