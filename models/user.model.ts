import mongoose, { Schema, Document, Model } from 'mongoose';

export enum ROLES {
  VISITOR = 'visitor',
  PROFESSIONAL = 'professional',
  ADMIN = 'admin'
};

export enum GENDERS {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
};

export interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birthday: Date;
  lovely_town: String;
  gender: GENDERS,
  image: String;
  password: string;
  role: ROLES;
  bookings: mongoose.Types.ObjectId;
  isVerified: boolean;
  isSuspended: boolean;
  isActive: boolean;
  lastLogin: Date;
  lastLogout: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    birthday: { type: Date },
    lovely_town: { type: String },
    gender: { type: String, enum: Object.values(GENDERS) },
    image: { type: String },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isSuspended: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    role: { type: String, enum: Object.values(ROLES), default: ROLES.VISITOR },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
    lastLogin: { type: Date },
    lastLogout: { type: Date },
  }, {
    timestamps: true,
});
  
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
  
export default User;
  