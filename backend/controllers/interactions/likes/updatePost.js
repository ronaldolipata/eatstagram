import mongoose from 'mongoose';
import Post from '../../../models/Post.js';

const updatePost = async (req, res) => {
  const { id } = req.params;
  // const interactionId = req.body.interactionId;
  const interactionId = req.header('X-INTERACTION-ID');

  try {
    const post = await Post.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          interactionId: mongoose.Types.ObjectId(interactionId),
        },
      }
    );

    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export default updatePost;
