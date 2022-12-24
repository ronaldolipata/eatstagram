import { Flex, Container, Input, Stack, Button, Text, Card, CardHeader, Avatar, Box, Heading } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const Search = () => {
  const [obj, setObj] = useState([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState('');
  const { getAccessTokenSilently } = useAuth0();
  const [error, setError] = useState('');

  const handleSearchName = async (event) => {
    event.preventDefault();

    setName(input);
  }

  const getAllNames = async () => {
    const accessToken = await getAccessTokenSilently();

    try {
      const response = await fetch(`${import.meta.env.EATS_BACKEND_BASE_URL}/user/${name}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // This is why we split the Authorization header
        },
      });
      const data = await response.json();

      setObj(data);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    getAllNames();
  }, [name]);

  return (
    <Flex flex='1'>
      <Container flex='1'>
        <Stack direction='row' spacing={6} align='center' pt='40px'>
          <Input variant='filled' placeholder='Search name' type='text' onChange={({ currentTarget: input }) => setInput(input.value)} />
          <Button onClick={handleSearchName} colorScheme='green' size='md' w='30vw'>
            Search
          </Button>
        </Stack>
        <Text mt='40px'>You searched for: {name}</Text>
        <Card maxW='md' m={5} boxShadow='none'>
          {obj.map((user, index) => {
            return (
              <Link key={user._id} to={`/app/profile/${user._id}`}>
                <Card m={1} key={user._id + index}>
                  <CardHeader>
                    <Flex spacing='4'>
                      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name={user.userInfo.name} src={user.avatar} />
                        <Box>
                          <Heading size='sm'>{user.userInfo.name}</Heading>
                        </Box>
                      </Flex>
                    </Flex>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </Card>
      </Container>
    </Flex>
  );
};

export default Search;
