import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITag extends Document {
  label: string;
  createdAt: Date;
  updatedAt: Date;
}

const TagSchema: Schema = new Schema({
  label: { type: String, required: true },
}, {
  timestamps: true,
});

const Tag: Model<ITag> = mongoose.models.Tag || mongoose.model<ITag>('Tag', TagSchema);

export default Tag;