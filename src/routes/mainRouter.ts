import express, { Router } from 'express';
import { userRoutes } from './userRoutes';
import { contentRoutes } from './contentRoutes';
import { linkRoutes } from './linkRoutes';

export const mainRouter: Router = express.Router();
mainRouter.use('/user', userRoutes);
mainRouter.use('/content', contentRoutes);
mainRouter.use('/brain', linkRoutes);
