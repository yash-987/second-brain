import { model, Model, Schema } from 'mongoose';
import { IUser } from '../shared/IUser';

const userSchema = new Schema<IUser>({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});

export const User: Model<IUser> = model<IUser>('users', userSchema);
