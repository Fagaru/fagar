// import mongoose from "mongoose";

// const Schema = mongoose.Schema;

// const citySchema = new Schema({
//     label: { type: String, required: true },
//     imageUrl: { type: String },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now }
//   }, { timestamps: true });
  
// export default mongoose.model('City', citySchema);

import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICity extends Document {
  label: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const CitySchema: Schema = new Schema({
  label: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, {
  timestamps: true,
});

const City: Model<ICity> = mongoose.models.City || mongoose.model<ICity>('City', CitySchema);

export default City;