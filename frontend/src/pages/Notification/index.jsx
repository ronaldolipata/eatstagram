import { Container } from '@chakra-ui/react';

const Notification = () => {
  const greeting = 'Notification Component!';

  return (
    <Container flex="1">
      <h1>{greeting}</h1>
    </Container>
  );
};

export default Notification;
