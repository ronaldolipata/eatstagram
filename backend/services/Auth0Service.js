import auth0 from 'auth0';

const { AuthenticationClient } = auth0;

class Auth0Service {
  // We make this static so we can get the value without initializing the class
  static serviceName = 'Auth0Service';

  constructor(domain, clientId, clientSecret) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.domain = domain;

    // Client to request directly in Auth0
    this.client = new AuthenticationClient({
      clientId,
      clientSecret,
      domain,
    });
  }

  async getProfile(accessToken) {
    return await this.client.getProfile(accessToken);
  }
}

export default Auth0Service;
