import { Types } from 'mongoose';

export interface ILink {
	hash: string;
	userId: Types.ObjectId;
	createdAt?: Date;
}
