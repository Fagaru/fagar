import { format } from "date-fns";

import { formatter } from "@/lib/utils";

import { CorporationsClient } from "./components/client";

import { Corporation } from '@/types/corporation';
import getCorporations from "@/services/getCorporations";

const CorporationsPage = async () => {

  const corporations = await getCorporations({});

  // const formattedCorporations: Corporation[] = corporations.map((item) => ({
  //   _id: item._id,
  //   name: item.name,
  //   isFeatured: item.isFeatured,
  //   isArchived: item.isArchived,
  //   price: formatter.format(item.price.toNumber()),
  //   category: item.category.name,
  //   size: item.size.name,
  //   color: item.color.value,
  //   createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  // }));
  const formattedCorporations: Corporation[] = corporations

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CorporationsClient data={formattedCorporations} />
      </div>
    </div>
  );
};

export default CorporationsPage;