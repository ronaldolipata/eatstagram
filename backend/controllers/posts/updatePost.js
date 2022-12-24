import Post from '../../models/Post.js';

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const post = await Post.findByIdAndUpdate({ _id: id }, { $set: content });

    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export default updatePost;
