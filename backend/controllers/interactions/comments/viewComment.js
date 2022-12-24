import Interaction from '../../../models/Interaction.js';

const viewComment = async (req, res) => {
  //this is the Id of the comment
  const { postId } = req.params.postId;
  const { commentId } = req.params.commentId;

  // find if the comment exist and is not deleted.
  const findComment = await Interaction.findOne({
    _id: id,
    type: 'comment',
    deletedAt: null,
  }).populate('relationId');

  // Check if there is a postId and type
  const likeInteraction = await Interaction.findOne(
    { relationId: postId },
    { type: 'comment' },
    { type: 'comment' }
  );

  // check if the comment exist, if not it will response an error message
  if (!findComment) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  //response the data with all of the data of the foreign key(relationId)
  return res.status(200).json(findComment);
};

export default viewComment;
