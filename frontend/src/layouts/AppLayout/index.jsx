import BottomNavigation from '@/components/BottomNavigation';
import { Box, Container, Flex } from '@chakra-ui/react';
import TopNavigation from '@/components/TopNavigation';
import { Outlet } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import LoadingPage from '@/pages/LoadingPage';
import style from './style.module.css';

const AppLayout = () => (
  <Flex direction="column" flex="1" className={style.container} overflow="hidden">
    <Box
      width="100%"
      boxShadow="xs"
      bg="white"
      zIndex="9"
      top="0"
      position="fixed"
    >
      <TopNavigation />
    </Box>
    <Flex
      position="relative"
      className={style.content}
      overflowY="auto"
      marginTop="60px"
    >
      <Container>
        <Outlet />
      </Container>
    </Flex>
    <Box
      width="100%"
      boxShadow="xs"
      bg="white"
      zIndex="9"
      bottom="0"
      position="fixed"
    >
      <BottomNavigation />
    </Box>
  </Flex>
);

export default withAuthenticationRequired(AppLayout, {
  onRedirecting: () => <LoadingPage />,
});
