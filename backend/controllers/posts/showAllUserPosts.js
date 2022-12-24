import Post from '../../models/Post.js';
import { isValidObjectId, Types } from 'mongoose';

const showAllUserPosts = async (req, res, next) => {
  let userId;
  if (!isValidObjectId(req.params.id)) {
    userId = req.currentUser._id.valueOf();
  } else {
    userId = req.params.id;
  }
  const { limit, offset } = req.query;

  // Show All existing posts of a specific user
  const pipelines = [
    {
      $match: {
        deletedAt: null,
        userId: Types.ObjectId(userId), // @todo: Improve by using $lookup
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ];

  // Push default limit of 15 if the limit is not given
  pipelines.push({
    $limit: !limit || isNaN(limit) ? 15 : parseInt(limit),
  });

  // Push to pipelines if the offset is given
  if (offset || !isNaN(offset)) {
    pipelines.push({
      $skip: parseInt(offset),
    });
  }

  const userPosts = await Post.aggregate(pipelines);

  return res.status(200).json(userPosts);
};

export default showAllUserPosts;
