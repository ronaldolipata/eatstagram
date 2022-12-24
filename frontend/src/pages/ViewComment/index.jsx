import { useAuth0 } from '@auth0/auth0-react';
import {
  Center,
  Text,
  Flex,
  Box,
  Input,
  Image,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import { Send } from '@ricons/carbon';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewComment = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [comments, setComments] = useState([]);

  // Input comment onChange
  const [comment, setComment] = useState(null);
  const [error, setError] = useState(null);
  const [serverError, setServerError] = useState(null);

  const { id } = useParams();

  const hanndleInputTextOnChange = (event) => {
    setComment(event.target.value);
  };

  const postComment = async () => {
    if (!comment) {
      return setError('Please enter your comment');
    }

    const accessToken = await getAccessTokenSilently();

    const formData = {
      content: comment,
    };

    try {
      await fetch(
        `${
          import.meta.env.EATS_BACKEND_BASE_URL
        }/interaction/comment/post/${id}/comments/`,
        {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Run the function again to refresh the array
      getAllComments();

      // @Todo implement bug for clearing the input and error
      // Clear state
      setComment(null);
      setError(null);
    } catch (e) {
      setServerError(e);
    }
  };

  const getAllComments = async () => {
    const accessToken = await getAccessTokenSilently();

    try {
      const response = await fetch(
        `${
          import.meta.env.EATS_BACKEND_BASE_URL
        }/interaction/comment/post/${id}/comments`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // This is why we split the Authorization header
          },
        }
      );
      const data = await response.json();
      setComments(data);
    } catch (e) {
      setServerError(e);
    }
  };

  useEffect(() => {
    getAllComments();
  }, [id]);

  return (
    <Box height='calc(97vh - 12.5rem)' overflow='scroll'>
      {comments.length === 0 || !comments ? (
        <Flex
          height='100%'
          justifyContent='center'
          alignItems='center'
          mx='1.5rem'
        >
          {serverError ? (
            <Text color='red'>{`Error: ${serverError}`}</Text>
          ) : (
            <Text fontSize='2xl' as='b'>
              No comments yet
            </Text>
          )}
        </Flex>
      ) : (
        <>
          <Box>
            <Box>
              {comments.map(({ _id, content, userId }) => (
                <Box key={_id} my='.5rem' p='1rem'>
                  <Flex>
                    <Image
                      src={userId.avatar}
                      borderRadius='50%'
                      py='.5rem'
                      marginRight='1rem'
                      h='5rem'
                      alt='profile'
                    />
                    <Flex
                      marginTop='.5rem'
                      flexDirection='column'
                      justifyContent='center'
                    >
                      <Text fontWeight='600'>{userId.userInfo.name}</Text>
                      <Text>{content}</Text>
                    </Flex>
                  </Flex>
                </Box>
              ))}
            </Box>
          </Box>
        </>
      )}
      <Center>
        <Flex
          flexDirection='column'
          alignItems='center'
          position='fixed'
          bottom='5rem'
        >
          <Flex alignItems='center' gap='1rem'>
            <Input
              onChange={hanndleInputTextOnChange}
              margin='.5rem 0'
              placeholder='Comment here'
              w='70vw'
            />
            <IconButton
              variant='ghost'
              icon={<Icon boxSize={8} as={Send} />}
              onClick={postComment}
            />
          </Flex>
          {error && <Text color='red'>{error}</Text>}
        </Flex>
      </Center>
    </Box>
  );
};

export default ViewComment;
