import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICategory extends Document {
  label: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema({
  label: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, {
  timestamps: true,
});

const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;