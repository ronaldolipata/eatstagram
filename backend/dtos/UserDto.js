export default class UserDto {
  constructor(userInfo) {
    const { _id: id, username, avatar } = userInfo;

    this.id = id;
    this.username = username;
    this.avatar = avatar;
  }
}
