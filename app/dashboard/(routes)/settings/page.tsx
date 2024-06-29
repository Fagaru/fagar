import { redirect } from "next/navigation";


interface SettingsPageProps {
    params: {
        userId: string;
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