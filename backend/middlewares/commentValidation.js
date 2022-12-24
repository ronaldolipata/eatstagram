import Post from '../models/Post.js';

const commentValidation = async (req, res, next) => {
  const { postId } = req.params;
  const userId = req.header('X-USER-ID');
  const { content } = req.body;

  // Checks if User is valid
  if (!userId) {
    res.status(404).json({ error: 'Invalid user id' });
  }

  const isPostExists = await Post.findById(postId);

  // Checks if Post is existing
  if (!isPostExists) {
    return res.status(404).json({
      error: 'Post does not exists.',
    });
  }

  // Checks if Content has a value
  if (!content) {
    return res.status(422).json({
      error: 'Content is required.',
    });
  }
  next();
};

export default commentValidation;
