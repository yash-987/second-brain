import { Types } from 'mongoose';

export interface IContent {
	link: string;
	type: string;
	title: string;
	tags: Types.ObjectId[];
	userId: Types.ObjectId;
	createdAt?: Date;
}
