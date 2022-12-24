import Follow from '../../../models/follow.js';
import { isValidObjectId } from 'mongoose';

const followers = async (req, res) => {
  let id;
  if (!isValidObjectId(req.params.id)) {
    id = req.currentUser._id;
  } else {
    id = req.params.id;
  }

  const followers = await Follow.find({ followThisId: id, deletedAt: null }); // returns all that followed currentUser

  res.status(200).json(followers);
};

export default followers;
