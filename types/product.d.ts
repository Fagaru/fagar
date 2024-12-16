export interface Product {
    psin: string; // Identifiant unique par produit
    title: string;
    description: string;
    mainImage: string;
    category: string; // Référence à une catégorie
    createdByVendorId: string; // Référence à un vendeur
    status: string;
    features: string[];
    createdAt: Date;
    updatedAt: Date;
}