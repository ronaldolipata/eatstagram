import Follow from '../../../models/follow.js';

const unfollow = async (req, res) => {
  const { id } = req.params; // id of an existing follow in db

  await Follow.updateOne({ followThisId: id, deletedAt: null }, { deletedAt: Date.now() }); // update that data in db

  res.status(200).json({ message: 'Unfollowed' }); // response a message
};

export default unfollow;
