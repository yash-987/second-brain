import { Model, Schema, model } from 'mongoose';
import { ILink } from '../shared/ILink';
const linkSchema = new Schema<ILink>({
	hash: { type: String, required: true },
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	createdAt: { type: Date, default: Date.now },
});

export const Link: Model<ILink> = model<ILink>('links', linkSchema);
