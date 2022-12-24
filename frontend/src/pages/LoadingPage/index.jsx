import { Button, Center, Flex } from '@chakra-ui/react';

const LoadingPage = () => (
  <Flex height="100vh" alignContent="center" justifyContent="center">
    <Center>
      <Button
        isLoading
        loadingText="Loading"
        colorScheme="teal"
        variant="outline"
        spinnerPlacement="start"
      >
        Loaded
      </Button>
    </Center>
  </Flex>
);

export default LoadingPage;
