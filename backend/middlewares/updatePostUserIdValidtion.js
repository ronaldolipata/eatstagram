import Post from '../models/Post.js';

const updatePostUserIdValidtion = async (req, res, next) => {
  const { id } = req.params;

  const isValid = await Post.findOne({ _id: id, userId: req.currentUser });

  if (!isValid) {
    return res.status(404).json({ error: 'Invalid User' });
  }

  next();
};

export default updatePostUserIdValidtion;
