import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { generateUsername } from 'unique-username-generator';
import app from '../app.js';
import Auth0Service from './Auth0Service.js';

const resolveUsername = (decodedUserInfo) => {
  const { nickname, preferred_username: preferredUsername } = decodedUserInfo;

  if (preferredUsername) {
    return preferredUsername;
  }

  if (nickname) {
    return nickname;
  }

  return generateUsername('-');
};

const findUser = async (authId) => {
  return await User.findOne({ authId });
};

const createUserFromUserInfo = async (authId, userInfo) => {
  return await User.create({
    authId,
    avatar: userInfo.picture,
    username: resolveUsername(userInfo),
    userInfo,
  });
};

/**
 * @deprecated Will be remove in next release
 */
export const resolveByUserInfo = async (userInfo) => {
  const { sub: authId, picture: avatar } = userInfo;

  // Find the user by its `authId` property
  let user = await findUser(authId);

  // If User cannot find, register a new one
  if (!user) {
    user = await createUserFromUserInfo(authId, userInfo);
  }

  return user;
};

export const resolveByAccessToken = async (accessToken) => {
  const { sub: authId } = jwt.decode(accessToken);

  let user = await findUser(authId);

  // If user was NOT found in the database
  if (!user) {
    const auth0 = app.get(Auth0Service.serviceName);

    // Get the userinfo details from Auth0
    const userInfo = await auth0.getProfile(accessToken);

    user = await createUserFromUserInfo(authId, userInfo);
  }

  return user;
};
