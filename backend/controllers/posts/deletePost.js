import Post from '../../models/Post.js';

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(
      { _id: id },
      { $set: { deletedAt: Date.now() } },
      { new: true }
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default deletePost;
