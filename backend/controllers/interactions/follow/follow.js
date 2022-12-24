import Follow from '../../../models/follow.js';

const follow = async (req, res) => {
  const { _id } = req.currentUser; // your Id
  const { id } = req.params; //Id of the user that i'll gonna follow

  await Follow.create({ followerId: _id, followThisId: id }); // create in db

  res.status(200).json({ message: 'Followed' }); // response a message
};

export default follow;
