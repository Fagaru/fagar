export interface Booking {
    _id: string;
    corporationId: string;
    userId: string;
    status: string;
    timeSlot: string;
    createdAt: Date;
    updatedAt: Date;
}