import { model, Model, Schema } from 'mongoose';
import { ITag } from '../shared/ITag';

const tagSchema = new Schema<ITag>({
	title: { type: String, required: true, unique: true },
	createdAt: { type: Date, default: Date.now },
});

export const Tag: Model<ITag> = model<ITag>('tags', tagSchema);
