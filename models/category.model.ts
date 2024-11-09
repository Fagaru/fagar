import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICategory extends Document {
  label: string;
  parentCategoryId: string | null;      // Catégorie parent (pour créer des sous-catégories)
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema({
  label: { type: String, required: true },
  parentCategoryId: { type: String },
}, {
  timestamps: true,
});

const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;