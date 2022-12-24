import Post from '../models/Post.js';
import mongoose from 'mongoose';

/**
 * @deprecated Will be removed in future release
 */
export default async function viewAllUserPostsValidation(req, res, next) {
  const userId = req.currentUser._id.valueOf();

  // Checks if a user has an existing post
  const userPostsChecker = await Post.find({userId: userId, deletedAt: null,});

  if (!mongoose.isValidObjectId(userId)) {
    return res.status(422).json({ message: 'Invalid User Object Id' });
  }

  if (!userId) {

    return res.status(422).json({
      error: "Please input a valid User Id"
    })
  }

  if (!userPostsChecker) {

    return res.status(422).json({
      error: "No existing Post yet for this user",
    });
  }
  next();
}