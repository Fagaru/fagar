export interface User {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    birthday: Date;
    lovely_town: String;
    gender: GENDERS,
    image: String;
    role: ROLES;
    isVerified: boolean;
    isSuspended: boolean;
    isActive: boolean;
    lastLogin: Date;
    lastLogout: Date;
    createdAt: Date;
    updatedAt: Date;
}