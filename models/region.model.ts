import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRegion extends Document {
  label: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const RegionSchema: Schema = new Schema({
  label: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, {
  timestamps: true,
});

const Region: Model<IRegion> = mongoose.models.Region || mongoose.model<IRegion>('Region', RegionSchema);

export default Region;