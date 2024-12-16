import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVariant extends Document {
    productId: mongoose.Types.ObjectId;
    vendorId: mongoose.Types.ObjectId;
    sku: string; // Numéro unique de variant
    attributes: {
        color?: string;
        size?: string;
        material?: string;
    };
    stock: number;
    price: number;
    imageUrl: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const variantSchema: Schema = new Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Corporation', required: true },
    sku: { type: String, required: true, unique: true },
    attributes: {
        color: { type: String },
        size: { type: String },
        material: { type: String },
    },
    stock: { type: Number, default: 0 },
    price: { type: Number, required: true },
    imageUrl: { type: String, default: "/default_image.jpg" },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Variant: Model<IVariant> = mongoose.models.Variant || mongoose.model<IVariant>('Variant', variantSchema);

export default Variant;