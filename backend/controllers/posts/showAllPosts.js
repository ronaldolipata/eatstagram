import Post from '../../models/Post.js';

const showAllPosts = async (req, res) => {
  const { limit, offset } = req.query;

  const userPosts = await Post.find({
    deletedAt: null,
  })
    .populate({ path: 'userId', select: 'avatar' })
    .populate({ path: 'interactionId', select: 'type content' })
    .sort({ createdAt: -1 })
    .limit(!limit || isNaN(limit) ? 15 : parseInt(limit))
    .skip(!offset || isNaN(offset) ? 0 : parseInt(offset));

  return res.status(200).json(userPosts);
};

export default showAllPosts;
