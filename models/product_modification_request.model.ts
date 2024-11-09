import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProductModificationRequest extends Document {
    productId: mongoose.Types.ObjectId;            // Référence au produit concerné
    requestedByVendorId: mongoose.Types.ObjectId;   // Référence au vendeur ayant fait la demande
    fieldsToUpdate: {                               // Champs demandés pour modification
        title?: string;
        description?: string;
        mainImage?: string;
        features?: string[];
        // Autres champs modifiables selon les besoins
    };
    status: "pending" | "approved" | "rejected";    // Statut de la demande
    reviewedByAdminId?: mongoose.Types.ObjectId;    // Référence de l'admin ayant traité la demande
    createdAt: Date;                                // Date de création de la demande
    updatedAt: Date;                                // Date de mise à jour de la demande
}

const productModificationRequestSchema: Schema = new Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    requestedByVendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Corporation', required: true },
    fieldsToUpdate: {
        title: { type: String },
        description: { type: String },
        mainImage: { type: String },
        features: [{ type: String }],
        // Ajouter d'autres champs modifiables ici
    },
    status: { 
        type: String, 
        enum: ["pending", "approved", "rejected"], 
        default: "pending" 
    },
    reviewedByAdminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const ProductModificationRequest: Model<IProductModificationRequest> = mongoose.models.ProductModificationRequest || mongoose.model<IProductModificationRequest>('ProductModificationRequest', productModificationRequestSchema);

export default ProductModificationRequest;