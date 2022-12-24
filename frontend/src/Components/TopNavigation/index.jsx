import { ArrowLeft } from '@ricons/carbon';
import {
  Box,
  Flex,
  IconButton,
  Image,
  Icon,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import Logo from '@/assets/Eatstagram-Light-Theme.png';
import DrawerMenu from './DrawerMenu';

const TopNavigation = ({ backButton }) => (
  <Box as="nav" role="navigation">
    <Flex alignItems="center" justifyContent="space-between" height="60px">
      {backButton === null ? (
        <IconButton variant="ghost">
          <Icon as={ArrowLeft} boxSize={8} borderRadius={0} />
        </IconButton>
      ) : (
        <div />
      )}
      <Box alignItems="center">
        <NavLink to="/app/home"><Image src={Logo} maxHeight={12} /></NavLink>
      </Box>
      <DrawerMenu />
    </Flex>
  </Box>
);

export default TopNavigation;
