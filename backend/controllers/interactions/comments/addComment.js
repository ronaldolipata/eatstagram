import Interaction from '../../../models/Interaction.js';

const addComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  // User ID from the model, use valueOf to get the actual Object ID
  const userId = req.currentUser._id.valueOf();

  // Pass data when user comment to a post
  const interactionData = new Interaction({
    type: 'comment',
    content,
    relationId: id,
    userId,
  });

  try {
    const postedComment = await interactionData.save();
    return res.status(201).json(postedComment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default addComment;
