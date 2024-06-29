export interface City {
    _id: string;
    label: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    images: Image[];
}

interface Image {
    _id: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
}