import mongoose from "mongoose";

const Schema = mongoose.Schema;

const regionSchema = new Schema({
    label: { type: String, required: true },
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }, { timestamps: true });

export default mongoose.model('Region', regionSchema);