import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';

import dotenv from 'dotenv';
import { ConnectDb } from '../src/config/db';
import { mainRouter } from '../src/routes/mainRouter';
import cors from 'cors';

dotenv.config();
ConnectDb();
const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/v1', mainRouter);

// Basic health check
app.get('/api', (req, res) => {
	res.json({ message: 'Second Brain API is running!' });
});

// Export the Express app as a Vercel handler
export default (req: VercelRequest, res: VercelResponse) => {
	return app(req, res);
};
