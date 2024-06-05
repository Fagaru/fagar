import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISubscription extends Document {
  label: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema: Schema = new Schema({
  label: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
}, {
  timestamps: true,
});

const Subscription: Model<ISubscription> = mongoose.models.Subscription || mongoose.model<ISubscription>('Subscription', SubscriptionSchema);

export default Subscription;