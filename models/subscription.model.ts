import mongoose from "mongoose";

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    label: { type: String, required: true },
    description: { type: String },
    price: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }, { _id: false });