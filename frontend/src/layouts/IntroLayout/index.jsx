import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const IntroLayout = () => (
  <Flex direction="column" flex="1" height="100vh">
    <Flex flex="1">
      <Outlet />
    </Flex>
  </Flex>
);

export default IntroLayout;
