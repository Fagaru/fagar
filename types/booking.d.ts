export interface Booking {
    _id: string;
    corporationId: string;
    userId: {first_name: string, last_name: string};
    status: string;
    date: Date;
    timeSlot: string;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}