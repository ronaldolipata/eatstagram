import { useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink } from 'react-router-dom';
import {
  Button,
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  useDisclosure,
  Icon,
} from '@chakra-ui/react';
import { Menu } from '@ricons/carbon';
import style from './style.module.css';

const DrawerMenu = () => {
  const { logout } = useAuth0();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const onLogout = () => {
    logout({
      returnTo: window.location.origin,
    });
    onClose();
  };

  return (
    <Box>
      <IconButton
        variant="ghost"
        height="60px"
        onClick={isOpen ? onClose : onOpen}
      >
        <Icon as={Menu} boxSize={8} />
      </IconButton>
      <Drawer
        isOpen={isOpen}
        placement="right"
        size="xs"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody className={style.drawerBody}>
            <Button variant="ghost" size="lg" mr={3} onClick={onClose}>
              Light / Dark Mode
            </Button>
            <Button variant="ghost" size="lg" mr={3} onClick={onClose}>
              Bookmarks
            </Button>
            <Button variant="ghost" size="lg" mr={3} as={NavLink} to={`/about`}>
              About
            </Button>
            <Button
              variant="ghost"
              size="lg"
              mr={3}
              as={NavLink}
              to={`/contact`}
            >
              Contact
            </Button>
            <Button
              variant="ghost"
              size="lg"
              mr={3}
              as={NavLink}
              to={`/privacyPolicy`}
            >
              Privacy Policy
            </Button>
            <Button
              variant="ghost"
              size="lg"
              mr={3}
              as={NavLink}
              to={`/termsOfConditions`}
            >
              Terms and Conditions
            </Button>
            <Button
              color="tomato"
              variant="ghost"
              size="lg"
              mr={3}
              onClick={onLogout}
            >
              Logout
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default DrawerMenu;
