import Interaction from '../../../models/Interaction.js';

const getLikeStatus = async (req, res) => {
  const { id } = req.params;
  const userId = req.currentUser._id.valueOf();

  // Check if there is a postId and type
  const likeInteraction = await Interaction.findOne(
    { relationId: id },
    { type: 'like' },
    { userId }
  );

  // If not found, return unlike
  if (!likeInteraction) {
    return res.status(200).json({ message: 'unlike' });
  }

  console.log(req.currentUser._id);

  return res.status(200).json({ message: 'like' });
};

export default getLikeStatus;
