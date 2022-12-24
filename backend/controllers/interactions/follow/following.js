import Follow from '../../../models/follow.js';
import { isValidObjectId } from 'mongoose';

const following = async (req, res) => {
  let id;
  if (!isValidObjectId(req.params.id)) {
    id = req.currentUser._id;
  } else {
    id = req.params.id;
  }

  const following = await Follow.find({ followerId: id, deletedAt: null }); //returns all that this currentUser follows

  res.status(200).json(following);
};

export default following;
