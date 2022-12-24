import User from '../models/User.js';

const searchUserMiddleware = async (req, res, next) => {
  const { name } = req.query;

  if (!name || name.trim().length === 0) {
    return res.status(400).json({ message: 'Invalid search input' });
  }

  const users = await User.find({ name: { $regex: name } }).select(
    'userInfo.name'
  );

  if (!users || users.length === 0) {
    return res.status(404).json({ message: 'No matching users were found' });
  }

  next();
};

export default searchUserMiddleware;
