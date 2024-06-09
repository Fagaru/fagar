import getSubscription from "@/services/getSubscription";
import { SubscriptionForm } from "./components/subscription-form";

const SubscriptionPage = async ({
    params
}: {
    params: {subscriptionId: string}
}) => {
    let subscription = null;
    if (params.subscriptionId !== "new") {
        subscription = await getSubscription({
            subscriptionId: params.subscriptionId
        });
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SubscriptionForm initialData={subscription}/>
            </div>
        </div>
    );
}

export default SubscriptionPage;