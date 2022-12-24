import {
  Container,
  Heading,
  Center,
  Text,
  Flex,
  Box,
} from '@chakra-ui/react';
import TopNavigation from '@/components/TopNavigation';

const Contact = () => (
  <Box>
    <TopNavigation />
    <Flex direction="column" align="center" w="100vw" pt="20px">
      <Center>
        <Heading as="h2" size="md" marginBottom="2rem">
          Contact Us
        </Heading>
      </Center>
      <Container padding="0 2rem">
        <Text marginBottom="1rem">Thank you for using our app!</Text>
        <Text marginBottom="1rem">
          If you would like to contact us about the Project, please send a
          message to below email. We will get back to you as soon as we can.
        </Text>
        <Text marginBottom="3rem">Email address: eatstagram@gmail.com</Text>
        <Text marginBottom="1rem">
          If you want to know more about the Team, please head over to About
          page.
        </Text>
      </Container>
    </Flex>
  </Box>
);

export default Contact;
