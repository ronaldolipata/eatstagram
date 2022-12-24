import { useAuth0 } from '@auth0/auth0-react';
import {
  Container,
  Text,
  IconButton,
  Flex,
  Image,
  Box,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import unlikeIcon from '@/assets/icons/unlike.svg';
import likeIcon from '@/assets/icons/like.svg';
import comment from '@/assets/icons/comment.svg';
import share from '@/assets/icons/share.svg';
import bookmark from '@/assets/icons/bookmark.svg';
import report from '@/assets/icons/report.svg';

const ViewPost = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [error, setError] = useState();

  const [likeStatus, setLikeStatus] = useState();
  const [interactionId, setInteractionId] = useState();

  const [post, setPost] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const interactions = [
    {
      title: 'profile',
      icon: user.picture,
    },
    {
      title: likeStatus === 'unlike' ? 'unlike' : 'like',
      icon: likeStatus === 'unlike' ? unlikeIcon : likeIcon,
    },
    {
      title: 'comment',
      icon: comment,
    },
    {
      title: 'share',
      icon: share,
    },
    {
      title: 'bookmark',
      icon: bookmark,
    },
  ];

  const convertDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const unlikePost = async () => {
    const accessToken = await getAccessTokenSilently();

    try {
      const response = await fetch(
        `${import.meta.env.EATS_BACKEND_BASE_URL}/interaction/like/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      // Set like status state to `like` if the return is 'like`, and vice versa
      setLikeStatus(data.message);

      // @Todo delete interactionId in array interactionId from Post
    } catch (e) {
      setError(e);
    }
  };

  const likePost = async () => {
    const accessToken = await getAccessTokenSilently();

    try {
      const response = await fetch(
        `${import.meta.env.EATS_BACKEND_BASE_URL}/interaction/like/${id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      // Set like status state to `like` if the return is 'like`, and vice versa
      setLikeStatus(data.message);

      const formData = {
        interactionId: data.result._id,
      };

      try {
        await fetch(
          `${import.meta.env.EATS_BACKEND_BASE_URL}/interaction/like/${id}`,
          {
            method: 'PATCH',
            body: JSON.stringify(formData),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
              'X-INTERACTION-ID': data.result._id,
            },
          }
        );
      } catch (e) {
        setError(e);
      }
    } catch (e) {
      setError(e);
    }
  };

  const interactionOnClick = (event, index) => {
    // setLikeStatus((prev) => !prev);

    if (interactions[index].title === 'like') {
      unlikePost();
    }

    if (interactions[index].title === 'unlike') {
      likePost();
    }

    if (interactions[index].title === 'comment') {
      navigate(`/app/post/${id}/comments`);
    }
  };

  // Check if User likes status in the Post
  const getLikeStatus = async (postId) => {
    const accessToken = await getAccessTokenSilently();

    try {
      const response = await fetch(
        `${import.meta.env.EATS_BACKEND_BASE_URL}/interaction/like/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // This is why we split the Authorization header
          },
        }
      );
      const data = await response.json();

      if (data) {
        // Set like status state to `like` if the return is 'like`, and vice versa
        setLikeStatus(data.message);
      }
    } catch (e) {
      setError(e);
    }
  };

  const getPostData = async (postId) => {
    const accessToken = await getAccessTokenSilently();

    try {
      const response = await fetch(
        `${import.meta.env.EATS_BACKEND_BASE_URL}/post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // This is why we split the Authorization header
          },
        }
      );
      const data = await response.json();

      setPost(data);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    getLikeStatus(id);
    getPostData(id);
  }, [id]);

  return (
    <Box marginBottom='2rem'>
      {post.map(({ _id, userId, image, content, createdAt }) => (
        <Box>
          <Flex
            key={_id}
            alignItems='center'
            justifyContent='space-beetween'
            position='relative'
          >
            <Image
              minWidth='370.4px'
              minHeight='463px'
              src={image}
              alt='post image'
            />
            <Flex flexDirection='column' gap='1.5rem' margin='4rem 0 0 -3.2rem'>
              {interactions.map((interaction, index) => (
                <IconButton
                  variant='ghost'
                  _hover='none'
                  key={interaction.title}
                  icon={
                    index === 0 ? (
                      <Image
                        src={userId.avatar}
                        boxShadow='md'
                        borderRadius='100%'
                        height='2.5rem'
                        width='2.5rem'
                      />
                    ) : (
                      <Image
                        id={interaction.title}
                        onClick={(event) => interactionOnClick(event, index)}
                        key={index}
                        src={interaction.icon}
                      />
                    )
                  }
                >
                  {interaction.title}
                </IconButton>
              ))}
              <IconButton
                position='absolute'
                bottom='1'
                variant='ghost'
                _hover='none'
                icon={<Image src={report} />}
              />
            </Flex>
          </Flex>
          <Container>
            <Text padding='2rem 0'>{content}</Text>
            <Text opacity='.7'>{createdAt}</Text>
            {error && <Text padding='2rem 0'>{error}</Text>}
          </Container>
        </Box>
      ))}
    </Box>
  );
};

export default ViewPost;
