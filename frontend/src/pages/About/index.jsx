import {
  Container,
  Text,
  Box,
  Link,
  Grid,
  GridItem,
  Heading,
  Center,
} from '@chakra-ui/react';
import TopNavigation from '@/components/TopNavigation';

const About = () => (
  <Box w="100vw">
    <TopNavigation />
    <Box pt="20px" pb="20px">
      <Center>
        <Heading as="h2" size="md" marginBottom="2rem">
          About Us
        </Heading>
      </Center>
      <Container padding="0 2rem">
        <Text marginBottom="1rem">
          Eatstagram is a photo sharing application that focuses on food
          contents and targets mobile users.
        </Text>
        <Text marginBottom="1rem">
          People can upload food photos to our service and share them with
          their followers whether it&lsquo;s their own or from a favorite
          restaurant. They can also view, comment and like posts from other
          users.
        </Text>
        <Text marginBottom="1rem">
          Eatstagram was created by Batch 12 students of Uplift Code Camp with
          the help of one of their Instructors.
        </Text>
        <Container padding="0">
          <Heading as="h2" size="sm" margin="2rem 0">
            Batch 12 Students
          </Heading>
          <Grid templateColumns="repeat(4, 1fr)" gap="0.3rem">
            <GridItem colSpan={1}>
              <Text>AJ</Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Link >https://github.com/jelandrewsosa</Link>
            </GridItem>
            <GridItem colSpan={1}>
              <Text>Amiel</Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Link>https://github.com/absalipande</Link>
            </GridItem>
            <GridItem colSpan={1}>
              <Text>Debz</Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Link>https://github.com/debbie31</Link>
            </GridItem>
            <GridItem colSpan={1}>
              <Text>Frances</Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Link>https://github.com/francesmarkx</Link>
            </GridItem>
            <GridItem colSpan={1}>
              <Text>Glaiza</Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Link>https://github.com/glai-za</Link>
            </GridItem>
            <GridItem colSpan={1}>
              <Text>Kris</Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Link>https://github.com/krisssy023</Link>
            </GridItem>
            <GridItem colSpan={1}>
              <Text>Phol</Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Link>https://github.com/Phol16</Link>
            </GridItem>
            <GridItem colSpan={1}>
              <Text>Ron</Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Link>https://github.com/ronaldolipata</Link>
            </GridItem>
          </Grid>
        </Container>
      </Container>
    </Box>
  </Box>
);

export default About;
