import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for Image Subschema
interface IImage {
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRegion extends Document {
  label: string;
  images: IImage[];
  createdAt: Date;
  updatedAt: Date;
}

const imageSchema: Schema = new Schema({
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { _id: false });

const RegionSchema: Schema = new Schema({
  label: { type: String, required: true },
  images: [imageSchema],
}, {
  timestamps: true,
});

const Region: Model<IRegion> = mongoose.models.Region || mongoose.model<IRegion>('Region', RegionSchema);

export default Region;