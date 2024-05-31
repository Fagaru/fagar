import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Address Subschema
const addressSchema = new Schema({
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
}, { _id: false }); // No need for a separate _id for embedded documents

// Image Subschema
const imageSchema = new Schema({
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { _id: false });

// Schedule Subschema
const scheduleSchema = new Schema({
  dayWeek: { type: String },
  begin_am: { type: Date },
  end_am: { type: Date },
  begin_pm: { type: Date },
  end_pm: { type: Date },
  available: { type: String, default: "closed" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { _id: false });

// Subscription Subschema
const subscriptionSchema = new Schema({
  starting_date: { type: Date },
  closing_date: { type: Date },
  isPaid: { type: Boolean, default: false },
  isSuspended: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  subscription: { type: Schema.Types.ObjectId, ref: 'Subscription' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { _id: false });

// Review Subschema
const reviewSchema = new Schema({
  userId: { type: String },
  comment: { type: String },
  stars: { type: String }, // étoiles 1 à 5
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { _id: false });

const corporationSchema = new Schema({
  name: { type: String, required: true },
  userId: { type: String },
  phone: { type: String },
  mail_pro: { type: String },
  description: { type: String },
  siretNum: { type: String },
  siren_num: { type: String },
  codeNAF: { type: String },
  linkFacebook: { type: String },
  linkInstagram: { type: String },
  linkLinkedIn: { type: String },
  linkX: { type: String },
  starting_date: { type: Date },
  numEmplyees: { type: String },
  address: addressSchema, // Embedded address
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  images: [imageSchema], // Embedded images
  schedules: [scheduleSchema], // Embedded schedules
  reviews: [reviewSchema], // Embedded reviews
  subscription: subscriptionSchema, // Embedded subscription
  isActive: { type: Boolean, default: false },
  isSuspended: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Corporation', corporationSchema);
