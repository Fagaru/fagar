import { format } from "date-fns";

import { SubscriptionClient } from "./components/client";
import getSubscriptions from "@/services/getSubscriptions";

const SubscriptionsPage = async () => {
    const subscriptions = await getSubscriptions();

    const formattedSubscriptions = subscriptions

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SubscriptionClient data={formattedSubscriptions}/>
            </div>
        </div>
    );
}

export default SubscriptionsPage;