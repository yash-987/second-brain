import expressAsyncHandler from 'express-async-handler';
import z from 'zod';
import { Content } from '../models/contentModel';
import { User } from '../models/userModel';

const contentBody = z.object({
	link: z.string(),
	title: z.string(),
	tags: z.array(z.string()).optional(),
	type: z.string().optional(),
});

type ContentBody = z.infer<typeof contentBody>;

export const createContent = expressAsyncHandler(async (req, res) => {
	const { title, type, tags, link }: ContentBody = req.body;
	const userId = req.userId;
	if (!title || !link) {
		res.status(403).json({ message: 'Please fill in all the fields' });
		return;
	}
	const { success } = contentBody.safeParse(req.body);
	if (!success) {
		res.status(403).json({ msg: 'Zod validation failed' });
		return;
	}

	const content = await Content.create({
		title: title,
		link: link,
		userId: userId,
		tags: tags,
		type: type,
	});
	if (!content) {
		res.status(403).json({ msg: 'Error in creating content' });
		return;
	}
	res.status(201).json({
		_id: content._id,
		link: content.link,
		title: content.title,
	});
});

export const getContent = expressAsyncHandler(async (req, res) => {
	const userId = req.userId;

	const content = await Content.find({
		userId: userId,
	}).populate('userId', 'username', User);

	if (!content) {
		res.status(403).json({ msg: "You haven't posted any content yet." });
		return;
	}

	res.json(content);
});

export const deleteContent = expressAsyncHandler(async (req, res) => {
	const contentId = req.body.contentId;
	const userId = req.userId;

	const contentExists = await Content.findOne({ _id: contentId, userId });
	if (!contentExists) {
		res.status(400).json({
			msg: "Content not found or you don't have persmission to delete it ",
		});
		return;
	}

	const deleted = await Content.deleteOne({ _id: contentId, userId });
	if (!deleted) {
		res.status(500).json({ msg: 'Internal server error' });
		return;
	}
	res.status(200).json({ msg: 'Content Deleted Successfully' });
});
