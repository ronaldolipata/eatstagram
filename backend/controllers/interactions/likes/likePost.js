import Interaction from '../../../models/Interaction.js';

const likePost = async (req, res) => {
  const { id } = req.params;
  // User ID from the model, use valueOf to get the actual Object ID
  const userId = req.currentUser._id.valueOf();

  // Pass data when user liked a post
  const interactionData = new Interaction({
    type: 'like',
    content: 'like',
    relationId: id,
    userId,
  });

  // Create new document
  await Interaction.findOne({ relationId: id });
  await interactionData.save();

  // Return like to use in the frontend
  return res.status(201).json({ result: interactionData, message: 'like' });
  // return res.status(201).json({ message: 'like' });
};

export default likePost;
