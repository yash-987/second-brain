import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const mongo_uri = process.env.MONGO_URI;

export const ConnectDb = async () => {
	if (!mongo_uri) {
		console.error('MONGO_URI is not defined in environment variables');
		throw new Error('MONGO_URI is undefined');
	}

	try {
		await mongoose.connect(mongo_uri);
		console.log('MongoDB connected successfully');
	} catch (error) {
		console.error('MongoDB connection failed:', error);
		// Don't exit process in serverless environment
		if (process.env.NODE_ENV === 'production') {
			throw error;
		} else {
			process.exit(1);
		}
	}
};
