import { NavLink } from 'react-router-dom';
import {
  AddAlt,
  UserAvatar,
  Home,
  Search,
  Notification,
} from '@ricons/carbon';
import {
  Box,
  Flex,
  IconButton,
  Icon,
} from '@chakra-ui/react';

const BottomNavigation = () => {
  const menus = [
    {
      link: 'home',
      title: 'Home',
      icon: Home,
    },
    {
      link: 'search',
      title: 'Search',
      icon: Search,
    },
    {
      link: 'create',
      title: 'Create Post',
      icon: AddAlt,
    },
    {
      link: 'notification',
      title: 'Notification',
      icon: Notification,
    },
    {
      link: 'profile',
      title: 'Profile',
      icon: UserAvatar,
    },
  ];

  const activeIcon = {
    backgroundColor: 'var(--chakra-colors-gray-200)',
  };

  return (
    <Box as="footer" role="contentinfo">
      <Flex
        height="60px"
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
      >
        {menus.map((menu) => (
          <IconButton
            width="100%"
            height="100%"
            as={NavLink}
            borderRadius={0}
            variant="ghost"
            to={`/app/${menu.link}`}
            key={menu.link}
            style={({ isActive }) => (isActive ? activeIcon : undefined)}
            icon={<Icon boxSize={8} as={menu.icon} />}
          >
            {menu.title}
          </IconButton>
        ))}
      </Flex>
    </Box>
  );
};

export default BottomNavigation;
