import User from '../../models/User.js';

//endpoint for searching a user
const searchUser = async (req, res) => {
  const userId = req.params.id;

  //check if the id exist and it is not deleted
  const findUser = await User.findOne({ _id: userId });

  //if data didnt exist it will response an error
  if (!findUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  //response the details of the data
  return res.status(200).json(findUser);
};

export default searchUser;
