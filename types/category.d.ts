export interface Category {
    _id: string;
    label: string;
    parentCategoryId: string;
    createdAt: Date;
    updatedAt: Date;
}