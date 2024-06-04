import { redirect } from "next/navigation";

import { SettingsForm } from "./components/settings-form";

interface SettingsPageProps {
    params: {
        storeId: string;
    }
};

const SettingsPage: React.FC<SettingsPageProps> = async ({
    params
}) => {
    
    return (
        <div className="flex-col">
            Settings
        </div>
    );
}

export default SettingsPage;