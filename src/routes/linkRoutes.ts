import express from 'express';
import {
	createSharableLink,
	getSharableLink,
} from '../controllers/linkController';
import { protect } from '../middlewares/middlewares';

export const linkRoutes = express.Router();

linkRoutes.route('/share').post(protect, createSharableLink);
linkRoutes.route('/:shareLink').get(getSharableLink);
