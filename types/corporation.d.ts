// types/corporation.d.ts
export interface Corporation {
    _id: string;
    name: string;
    userId: string;
    phone: string;
    mail_pro: string;
    description: string;
    siretNum: string;
    siren_num: string;
    codeNAF: string;
    linkFacebook: string;
    linkInstagram: string;
    linkLinkedIn: string;
    linkX: string;
    starting_date: Date;
    numEmplyees: string;
    address: Address;
    categoryId: string;
    tags: string[];
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
    dayWeek: string;
    begin_am: Date;
    end_am: Date;
    begin_pm: Date;
    end_pm: Date;
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
    stars: string;
    createdAt: Date;
    updatedAt: Date;
}  