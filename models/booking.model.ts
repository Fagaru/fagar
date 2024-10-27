import mongoose, { Schema, Document, Model } from 'mongoose';

export enum STATUS {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    DENIED = 'denied'
};

export interface IBooking extends Document {
    userId: mongoose.Types.ObjectId;
    corporationId: mongoose.Types.ObjectId;
    date: Date;
    timeSlot: string;
    status: string;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}

const bookingSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    corporationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Corporation', required: true },
    // serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true }, // Prochaine amélioration
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true }, // Format 'HH:mm-HH:mm'
    status: { type: String, enum: Object.values(STATUS), default: STATUS.PENDING },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Création du modèle de réservation (Booking)
const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;