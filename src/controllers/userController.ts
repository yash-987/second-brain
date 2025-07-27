import expressAsyncHandler from 'express-async-handler';
import z from 'zod';
import { User } from '../models/userModel';
import { HashPassword, MatchPasword } from '../config/securePassword';
import { GenerateToken } from '../config/token';

const signupBody = z.object({
	username: z.string(),
	password: z.string(),
});

type SignupBody = z.infer<typeof signupBody>;
export const SignUp = expressAsyncHandler(async (req, res) => {
	const { username, password }: SignupBody = req.body;

	if (!username || !password) {
		res.status(403).json({ message: 'Please fill in all the fields' });
		return;
	}
	const { success } = signupBody.safeParse(req.body);
	if (!success) {
		res.status(411).json({
			message: 'Email already taken/Incorrect inputs',
		});

		return;
	}

	const userExists = await User.findOne({ username });

	if (userExists) {
		res.status(403).json({ message: 'User already exists' });
	}
	const hashedPass = await HashPassword(password);

	const user = await User.create({
		username,
		password: hashedPass,
	});

	if (!user) {
		res.status(403).json({ message: 'User did not created' });
	}

	const userId = user._id;

	const token = GenerateToken(userId);
	res.status(201).json({
		_id: user._id,
		username: user.username,
		token: token,
	});
});

const signinBody = z.object({
	username: z.string(),
	password: z.string(),
});

type SigninBody = z.infer<typeof signinBody>;
export const Signin = expressAsyncHandler(async (req, res) => {
	const { username, password }: SigninBody = req.body;

	console.log(req.body);
	if (!username || !password) {
		res.status(403).json({ message: 'Please fill in all the fields' });
		return;
	}
	const { success } = signinBody.safeParse(req.body);
	if (!success) {
		res.status(411).json({
			message: 'Incorrect inputs',
		});

		return;
	}

	const user = await User.findOne({ username });

	if (!user) {
		res.status(403).json({ message: "User doesn't exists with this username" });
		return;
	}
	const isPasswordMatched = await MatchPasword(password, user.password);

	if (!isPasswordMatched) {
		res.status(403).json({ msg: 'Incorrect Password' });
	}

	const token = GenerateToken(user._id);

	res.status(200).json({
		username: user.username,
		token: token,
	});
});
