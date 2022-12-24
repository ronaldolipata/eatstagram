import { useAuth0 } from '@auth0/auth0-react';
import { Button, Center, Flex, Grid, Heading, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import GridProfile from '@/components/GridProfile';

const OtherProfile = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [profile, setProfile] = useState([]);
  const [posts, setPosts] = useState([]);
  const [follow, setFollow] = useState('Follow');
  const [following, setFollowing] = useState('0');
  const [followers, setFollowers] = useState('0');

  const { id } = useParams();
  useEffect(() => {
    const fetching = async () => {
      const accessToken = await getAccessTokenSilently();
      try {
        const profileData = await fetch(`${import.meta.env.EATS_BACKEND_BASE_URL}/user/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // This is why we split the Authorization header
          },
        }).then((res) => res.json());

        const postData = await fetch(`${import.meta.env.EATS_BACKEND_BASE_URL}/post/users/${id}/posts`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // This is why we split the Authorization header
          },
        }).then((res) => res.json());

        const followData = await fetch(`${import.meta.env.EATS_BACKEND_BASE_URL}/follow/followStatus/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // This is why we split the Authorization header
          },
        }).then((res) => res.json());
        const followingData = await fetch(`${import.meta.env.EATS_BACKEND_BASE_URL}/follow/following/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // This is why we split the Authorization header
          },
        }).then((res) => res.json());

        const followersData = await fetch(`${import.meta.env.EATS_BACKEND_BASE_URL}/follow/followers/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // This is why we split the Authorization header
          },
        }).then((res) => res.json());

        setFollowers(followersData.length);
        setFollowing(followingData.length);
        setProfile(profileData);
        setPosts(postData);

        if (followData.message === 'you didnt follow this user yet') {
          setFollow('Follow');
        } else {
          setFollow('Unfollow');
        }
      } catch (e) {
        // console.log(e);
      }
    };
    fetching();
  }, [follow]);

  const followBtn = async () => {
    const accessToken = await getAccessTokenSilently();

    if (follow === 'Follow') {
      setFollow('Unfollow');
      await fetch(`${import.meta.env.EATS_BACKEND_BASE_URL}/follow/follow/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`, // This is why we split the Authorization header
        },
      }).then((res) => res.json());

      return;
    }

    setFollow('Follow');
    await fetch(`${import.meta.env.EATS_BACKEND_BASE_URL}/follow/unfollow/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`, // This is why we split the Authorization header
      },
    }).then((res) => res.json());
  };

  return (
    <Flex direction='column' gap='20px' py='25px'>
      <Flex direction='column' align='center' py='10px' gap='10px'>
        <Image style={{ borderRadius: '50%' }} src={profile.avatar} alt='profile' />
        <Text fontSize='xl'>{`@${profile.username}`}</Text>
      </Flex>
      <Flex justify='space-around'>
        <Flex direction='column' align='center' w='70px'>
          <Heading size='xl'>{following}</Heading>
          {/* Todo: add the value of Following here */}
          <Text size='sm' opacity='.7'>
            Following
          </Text>
        </Flex>
        <Flex direction='column' align='center' w='70px'>
          <Heading size='xl'>{followers}</Heading>
          {/* Todo: add the value of Followers here */}
          <Text size='sm' opacity='.7'>
            Followers
          </Text>
        </Flex>
        <Flex direction='column' align='center' w='70px'>
          <Heading size='xl'>2.5M </Heading>
          {/* Todo: add the value of Likes here */}
          <Text size='sm' opacity='.7'>
            Likes
          </Text>
        </Flex>
      </Flex>
      <Button alignSelf='center' onClick={followBtn}>
        {follow}
      </Button>
      <Text align='center' maxH='200px' overflow='auto' py='20px'>
        Bio
      </Text>
      {posts.length === 0 ? (
        <Center>
          <Text fontSize='2xl' as='b'>
            No posts yet
          </Text>
        </Center>
      ) : (
        <Grid templateColumns='repeat(3, 1fr)' gap='10px'>
          {posts.map((post) => (
            <Link key={post._id} to={`/app/post/${post._id}`}>
              <GridProfile userPost={post.image} height={167} />
            </Link>
          ))}
        </Grid>
      )}
    </Flex>
  );
};

export default OtherProfile;
