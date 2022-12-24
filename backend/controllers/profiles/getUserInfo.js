import UserDto from '../../dtos/UserDto.js';

const getUserInfo = async (req, res) => {
  return res.status(200).json(new UserDto(req.currentUser));
};

export default getUserInfo;
