import express from 'express';

import dotenv from 'dotenv';
import { ConnectDb } from './config/db';
import { mainRouter } from './routes/mainRouter';
import cors from 'cors';

dotenv.config();
ConnectDb();
const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/v1', mainRouter);

const port = process.env.PORT;
app.listen(port, () => console.log('server started on port', port));
