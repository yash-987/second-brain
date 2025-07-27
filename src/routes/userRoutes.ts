import express from 'express';
import { Signin, SignUp } from '../controllers/userController';

export const userRoutes = express.Router();

userRoutes.route('/signup').post(SignUp);
userRoutes.route('/signin').post(Signin);
