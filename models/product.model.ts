import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
    psin: string;
    title: string;
    description: string;
    mainImage: string;
    category: mongoose.Types.ObjectId; // Référence à une catégorie
    createdByVendorId: mongoose.Types.ObjectId; // Référence à un vendeur
    status: string;
    features: string[];
    createdAt: Date;
    updatedAt: Date;
}

const productSchema: Schema = new Schema({
    psin: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    mainImage: { type: String, default: "/default_image.jpg" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    createdByVendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Corporation', required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
    features: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default Product;