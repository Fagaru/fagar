import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tagSchema = new Schema({
    label: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }, { timestamps: true });
  
export default mongoose.model('Tag', tagSchema);