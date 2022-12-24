import Interaction from '../../../models/Interaction.js';

const viewAllComments = async (req, res) => {
  const { id } = req.params;
  const { limit, offset } = req.query;

  const commentInfo = await Interaction.find({
    type: 'comment',
    relationId: id,
  })
    .populate({ path: 'userId', select: 'avatar userInfo' })
    .sort({ createdAt: -1 })
    .limit(limit || 10)
    .skip(offset || 0);

  return res.status(200).json(commentInfo);
};

export default viewAllComments;
