import { Schema, Model, model } from 'mongoose';
import { IContent } from '../shared/IContent';

const contentSchema = new Schema<IContent>({
	link: { type: String, required: true },
	type: { type: String },
	title: { type: String, required: true },
	tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	createdAt: { type: Date, default: Date.now },
});
export const Content: Model<IContent> = model<IContent>(
	'content',
	contentSchema
);
