import Follow from '../../../models/follow.js';

const getFollowStatus = async (req, res) => {
  const { _id } = req.currentUser; // id
  const { id } = req.params; // id of the other user

  const status = await Follow.findOne({ followerId: _id, followThisId: id, deletedAt: null }); // search if follow exist it means i already followed this user if it exist and not deleted

  if (!status) {
    return res.status(400).json({ message: 'you didnt follow this user yet' });
  }

  res.status(200).json(status); // response the data
};

export default getFollowStatus;
