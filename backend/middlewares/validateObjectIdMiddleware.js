import mongoose from 'mongoose';

const validateObjectIdMiddleware = (params) => {
  return (req, res, next) => {
    for (const param of params) {
      if (!mongoose.isValidObjectId(param)) {
        return res.status(422).json({ message: 'Invalid ObjectId' });
      }
    }

    next();
  };
};

export default validateObjectIdMiddleware;
