import expressAsyncHandler from 'express-async-handler';
import { Link } from '../models/linkModel';
import { random } from '../utils/utils';
import { Content } from '../models/contentModel';
import { User } from '../models/userModel';

export const createSharableLink = expressAsyncHandler(async (req, res) => {
	const share: boolean = req.body.share;

	if (share != true) {
		await Link.deleteOne({ userId: req.userId });
		res.json({
			msg: 'Removed Successfully',
		});
		return;
	}
	console.log(req.userId);
	const linkExists = await Link.findOne({
		userId: req.userId,
	});
	if (linkExists) {
		res.json({
			hash: linkExists.hash,
		});
		return;
	}
	const link = await Link.create({
		userId: req.userId,
		hash: random(10),
	});

	if (!link) {
		res.status(403).json({ msg: 'Error in creating sharable link' });
		return;
	}
	res.json({
		msg: 'Created Link Successfully',
		link: link,
	});
});

export const getSharableLink = expressAsyncHandler(async (req, res) => {
	const hash = req.params.shareLink;

	const link = await Link.findOne({
		hash,
	});
	if (!link) {
		res.status(403).json({
			msg: 'Sorry! Incorrect Inputs',
		});
		return;
	}
	//get the content from the link
	const content = await Content.findOne({
		userId: link.userId,
	});

	//get user info
	const user = await User.findOne({
		_id: link.userId,
	});

	res.json({
		username: user?.username,
		content: content,
	});
});
