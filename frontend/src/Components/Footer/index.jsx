import {
  Box,
  Container,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const Footer = () => (
  <Box
    bg={useColorModeValue('gray.50', 'gray.900')}
    w="100vw"
    pos="fixed"
    zIndex={2}
    bottom="0"
    color={useColorModeValue('gray.700', 'gray.200')}
  >
    <Container
      as={Stack}
      maxW="6xl"
      py={4}
      direction={{ base: 'column', md: 'row' }}
      spacing={4}
      justify={{ base: 'center', md: 'space-between' }}
      align={{ base: 'center', md: 'center' }}
    >
      <Stack direction="row" spacing={6}>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/privacyPolicy">Privacy</NavLink>
        <NavLink to="/termsOfConditions">Terms</NavLink>
      </Stack>
    </Container>
  </Box>
);

export default Footer;
