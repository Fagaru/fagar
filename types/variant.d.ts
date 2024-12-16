export interface Variant {
    productId: string;
    vendorId: string;
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