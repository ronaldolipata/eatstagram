import Auth0Service from '../services/Auth0Service.js';
import { resolveByAccessToken } from '../services/auth0UserResolver.js';

const currentUserMiddleware = async (req, res, next) => {
  const authorization = req.header('Authorization');

  // Check if the Authorization Header exists, otherwise 401 Unauthorize
  if (!authorization) {
    return res.status(401).json({
      error: 'You are not authenticated',
    });
  }

  // We split the Authorization value into array
  // We only need the access token
  const [, accessToken] = authorization.split(' ');

  req.currentUser = await resolveByAccessToken(accessToken);

  next();
};

export default currentUserMiddleware;
