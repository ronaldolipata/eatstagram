import { useAuth0 } from '@auth0/auth0-react';
import {
  Container,
  Text,
  IconButton,
  Flex,
  Image,
  Box,
} from '@chakra-ui/react';
import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import unlikeIcon from '@/assets/icons/unlike.svg';
import likeIcon from '@/assets/icons/like.svg';
import comment from '@/assets/icons/comment.svg';
import share from '@/assets/icons/share.svg';
import bookmark from '@/assets/icons/bookmark.svg';
import report from '@/assets/icons/report.svg';
import { Icon } from '@chakra-ui/icons';

const Home = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [error, setError] = useState();
  const [posts, setPosts] = useState();

  const [likeStatus, setLikeStatus] = useState();

  const { id } = useParams();
  const navigate = useNavigate();

  const refLikeIconImage = useRef();

  const interactions = [
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

  const unlikePost = async (id) => {
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

  const likePost = async (id) => {
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

  const interactionOnClick = (id, type) => {
    if (type === 'like') {
      unlikePost(id);
    }

    if (type === 'unlike' || type === undefined) {
      likePost(id);
    }

    // if (interactions[index].title === 'comment') {
    //   navigate(`/app/post/${id}/comments`);
    // }

    // console.log(refLikeIconImage);
  };

  const navigateToUserProfile = (userId) => {
    navigate(`/app/profile`);
  };

  const convertDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const getAllPostsData = async () => {
    const accessToken = await getAccessTokenSilently();

    try {
      const response = await fetch(
        `${import.meta.env.EATS_BACKEND_BASE_URL}/post`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // This is why we split the Authorization header
          },
        }
      );
      const data = await response.json();
      setPosts(data);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    getAllPostsData();
  }, [id]);

  return (
    <>
      {posts &&
        posts.map(
          ({ _id, image, content, createdAt, userId, interactionId }) => (
            <Box
              key={_id}
              marginBottom='2rem'
              paddingBottom='2rem'
              border='1px solid rgba(28,110,164,0.21)'
              borderRadius='1rem'
            >
              <Flex
                alignItems='center'
                justifyContent='space-beetween'
                position='relative'
              >
                <Image
                  minWidth='370.4px'
                  minHeight='463px'
                  src={image}
                  alt='post image'
                  borderRadius='1rem 1rem 0 0'
                />

                <Flex
                  flexDirection='column'
                  gap='1.5rem'
                  margin='4rem 0 0 -3.2rem'
                >
                  <IconButton
                    variant='ghost'
                    _hover='none'
                    icon={
                      <Image
                        src={userId.avatar}
                        // onClick={navigateToUserProfile(userId)}
                        boxShadow='md'
                        borderRadius='100%'
                        height='2.5rem'
                        width='2.5rem'
                      />
                    }
                  ></IconButton>
                  {interactionId.length === 0 ? (
                    <IconButton
                      variant='ghost'
                      _hover='none'
                      icon={
                        <Image
                          ref={refLikeIconImage}
                          // onClick={() => interactionOnClick()}
                          src={unlikeIcon}
                        />
                      }
                    ></IconButton>
                  ) : (
                    interactionId.map((interaction, index) => (
                      <IconButton
                        variant='ghost'
                        _hover='none'
                        key={index}
                        icon={
                          <Image
                            ref={refLikeIconImage}
                            // onClick={() =>
                            //   interactionOnClick(_id, interaction.type)
                            // }
                            src={
                              interaction.type === 'unlike' ||
                              interactionId.length === 0
                                ? unlikeIcon
                                : likeIcon
                            }
                          />
                        }
                      ></IconButton>
                    ))
                  )}
                  {interactions.map((interaction, index) => (
                    <IconButton
                      variant='ghost'
                      _hover='none'
                      key={interaction.title}
                      icon={
                        <Image
                          id={interaction.title}
                          // onClick={(event) => interactionOnClick(event, index)}
                          key={index}
                          src={interaction.icon}
                        />
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
                <Text opacity='.7'>{convertDate(createdAt)}</Text>
                {error && <Text padding='2rem 0'>{error}</Text>}
              </Container>
            </Box>
          )
        )}
    </>
  );
};

export default Home;
