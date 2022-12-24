import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react';

const LoginBtn = () => {
  const { loginWithRedirect } = useAuth0();

  const login = () => {
    loginWithRedirect();
  };

  return <Button onClick={login}>Login</Button>;
};

export default LoginBtn;
