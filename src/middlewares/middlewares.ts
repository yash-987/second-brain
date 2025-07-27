import { Request, Response, NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { DecodeToken } from '../config/token';
declare module 'express-serve-static-core' {
	interface Request {
		userId?: string;
	}
}
dotenv.config();
const jwtPass = process.env.JWT_SECRET;
if (!jwtPass) throw new Error('JWT_SECRET is not defined');
export const protect = expressAsyncHandler(async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		res.status(403).json({
			message: 'Invalid token',
		});
		return;
	}
	try {
		const token = authHeader.split(' ')[1];
		const decoded = DecodeToken(token);
		if (decoded && typeof decoded === 'object' && 'id' in decoded) {
			req.userId = decoded.id;
			next();
		} else {
			res.status(403).json({ message: "Can't get user id" });
		}
	} catch (error) {
		res.status(403).json({
			message: 'No Token',
		});
		return;
	}
});
