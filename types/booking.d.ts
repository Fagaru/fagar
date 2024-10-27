export interface Booking {
    _id: string;
    corporationId: string;
    userId: string;
    status: string;
    date: Date;
    timeSlot: string;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}