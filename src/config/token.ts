import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { Types } from 'mongoose';
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

export const GenerateToken = (id: Types.ObjectId) => {
	if (!jwtSecret) {
		throw new Error('Jwt is not defined');
	}
	return jwt.sign({ id }, jwtSecret, {
		expiresIn: '30d',
	});
};

export const DecodeToken = (param: string) => {
	if (!jwtSecret) {
		throw new Error('Jwt is not defined');
	}
	return jwt.verify(param, jwtSecret);
};
