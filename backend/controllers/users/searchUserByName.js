import User from '../../models/User.js';

const searchUserByName = async (req, res) => {
  const { name } = req.params;

  try {
    const searchUser = await User.aggregate([
      { $match: { 'userInfo.name' : { "$regex": name}}}
    ])
    if (!searchUser) {
      return res.status(404).json({ message: 'No matching user found ' });
    }

    return res.status(200).json(searchUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default searchUserByName;
