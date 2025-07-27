import express, { Router } from 'express';
import { protect } from '../middlewares/middlewares';
// import { createConnection } from 'mongoose';
import {
	createContent,
	deleteContent,
	getContent,
} from '../controllers/contentController';

export const contentRoutes: Router = express.Router();

contentRoutes.route('/create').post(protect, createContent);
contentRoutes.route('/').get(protect, getContent);
contentRoutes.route('/delete').delete(protect, deleteContent);
