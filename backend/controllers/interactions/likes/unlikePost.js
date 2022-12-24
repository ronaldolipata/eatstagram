import Interaction from '../../../models/Interaction.js';

const unlikePost = async (req, res) => {
  const { id } = req.params;

  await Interaction.deleteOne({ relationId: id }, { type: 'like' });
  return res.status(200).json({ message: 'unlike' });
};

export default unlikePost;
