import Post from '../../models/Post.js';

// GET '/post/:id'
const viewPost = async (req, res) => {
  // // Get the :id from the segment
  const { id } = req.params;

  const findPost = await Post.find({
    _id: id,
    deletedAt: null,
  }).populate({ path: 'userId', select: 'avatar' });

  return res.status(200).json(findPost);
};

export default viewPost;
