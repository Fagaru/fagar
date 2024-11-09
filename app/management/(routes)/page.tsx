import AddBooking from "@/components/AddBooking";
import { ModalBookingProvider } from "@/providers/modal_booking-provider";

interface ManagementPageProps {
    params: {userId: string}
};

const ManagementPage: React.FC<ManagementPageProps> = async({
    params
}) => {
    return (
        <div className="items-center">
            <div className="flex-1 space-y-4 p-8 pt-6">
                {/* <CorporationForm /> */}
                Overview
            </div>
        </div>
    );
}

export default ManagementPage;