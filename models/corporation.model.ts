import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for Address Subschema
interface IAddress {
  lat: string;
  lng: string;
  placeId: string;
  label: string;
  country: string;
  regionId: mongoose.Types.ObjectId;
  cityId: mongoose.Types.ObjectId;
  postCode: string;
  streetName: string;
  streetNum: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface for Image Subschema
interface IImage {
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface for Schedule Subschema
interface ISchedule {
  dayWeek: number;
  begin_am: string;
  end_am: string;
  begin_pm: string;
  end_pm: string;
  available: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface for Subscription Subschema
interface ISubscription {
  starting_date: Date;
  closing_date: Date;
  isPaid: boolean;
  isSuspended: boolean;
  isActive: boolean;
  subscription: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface for Review Subschema
interface IReview {
  userId: string;
  comment: string;
  stars: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITag {
  label: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for Corporation Document
export interface ICorporation extends Document {
  name: string;
  userId: mongoose.Types.ObjectId;
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
  address: IAddress;
  categoryId: mongoose.Types.ObjectId;
  tags: ITag[];
  images: IImage[];
  schedules: ISchedule[];
  reviews: IReview[];
  subscription: ISubscription;
  duration_booking: string;
  isVerified: boolean;
  isActive: boolean;
  isSuspended: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const addressSchema: Schema = new Schema({
  lat: { type: String },
  lng: { type: String },
  placeId: { type: String },
  label: { type: String },
  country: { type: String },
  regionId: { type: Schema.Types.ObjectId, ref: 'Region' },
  cityId: { type: Schema.Types.ObjectId, ref: 'City' },
  postCode: { type: String },
  streetName: { type: String },
  streetNum: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { _id: false });

const imageSchema: Schema = new Schema({
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { _id: false });

const scheduleSchema: Schema = new Schema({
  dayWeek: { type: Number },
  begin_am: { type: String },
  end_am: { type: String },
  begin_pm: { type: String },
  end_pm: { type: String },
  available: { type: String, default: "closed" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { _id: false });

const subscriptionSchema: Schema = new Schema({
  starting_date: { type: Date },
  closing_date: { type: Date },
  isPaid: { type: Boolean, default: false },
  isSuspended: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  subscription: { type: Schema.Types.ObjectId, ref: 'Subscription' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { _id: false });

const reviewSchema: Schema = new Schema({
  userId: { type: String },
  comment: { type: String },
  stars: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { _id: false });

const tagSchema: Schema = new Schema({
  label: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { _id: false });

const corporationSchema: Schema = new Schema({
  name: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  phone: { type: String },
  mail_pro: { type: String },
  description: { type: String },
  siret_num: { type: String },
  siren_num: { type: String },
  code_naf: { type: String },
  linkFacebook: { type: String },
  linkInstagram: { type: String },
  linkLinkedIn: { type: String },
  linkX: { type: String },
  starting_date: { type: Date },
  numEmplyees: { type: String },
  address: addressSchema,
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
  tags: [tagSchema],
  images: [imageSchema],
  schedules: [scheduleSchema],
  reviews: [reviewSchema],
  subscription: subscriptionSchema,
  duration_booking: { type: String, default: '01:00' },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  isSuspended: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const Corporation: Model<ICorporation> = mongoose.models.Corporation || mongoose.model<ICorporation>('Corporation', corporationSchema);

export default Corporation;
