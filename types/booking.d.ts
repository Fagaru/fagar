export interface ITimeSlot {
    startTime: string; // format 'HH:mm'
    endTime: string;   // format 'HH:mm'
}

export interface Booking {
    _id: string;
    corporationId: string;
    userId: string;
    status: string;
    timeSlot: ITimeSlot;
    createdAt: Date;
    updatedAt: Date;
}