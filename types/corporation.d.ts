export interface Corporation {
    _id: string;
    name: string;
    userId: string;
    phone: string;
    mail_pro: string;
    description: string;
    siret_num: string;
    siren_num: string;
    code_naf: string;
    linkFacebook: string;
    linkInstagram: string;
    linkLinkedIn: string;
    linkX: string;
    starting_date: string;
    address: Address;
    categoryId: string;
    tags: Tag[];
    images: Image[];
    schedules: Schedule[];
    reviews: Review[];
    subscription: Subscription;
    isActive: boolean;
    isSuspended: boolean;
    createdAt: Date;
    updatedAt: Date;
}
  
interface Address {
    _id: string;
    lat: string;
    lng: string;
    placeId: string;
    label: string;
    country: string;
    regionId: string;
    cityId: string;
    postCode: string;
    streetName: string;
    streetNum: string;
    createdAt: Date;
    updatedAt: Date;
}
  
interface Image {
    _id: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
}
  
interface Schedule {
    _id: string;
    dayWeek: number;
    begin_am: string;
    end_am: string;
    begin_pm: string;
    end_pm: string;
    available: string;
    createdAt: Date;
    updatedAt: Date;
}
  
interface Subscription {
    _id: string;
    starting_date: Date;
    closing_date: Date;
    isPaid: boolean;
    isSuspended: boolean;
    isActive: boolean;
    subscription: string;
    createdAt: Date;
    updatedAt: Date;
}
  
interface Review {
    _id: string;
    userId: string;
    comment: string;
    stars: number;
    createdAt: Date;
    updatedAt: Date;
} 

interface Tag {
    _id: string;
    label: string;
    createdAt: Date;
    updatedAt: Date;
}