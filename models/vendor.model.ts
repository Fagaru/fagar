import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVendor extends Document {
  name: string;
  contactEmail: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const vendorSchema: Schema = new Schema({
  name: { type: String, required: true },
  contactEmail: { type: String, required: true, unique: true },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Vendor: Model<IVendor> = mongoose.models.Vendor || mongoose.model<IVendor>('Vendor', vendorSchema);

export default Vendor;