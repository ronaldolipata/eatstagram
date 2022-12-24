import { useAuth0 } from '@auth0/auth0-react';
import { Flex, Grid, Heading, Center, Text, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GridProfile from '@/components/GridProfile';
import ProfileButton from '@/components/ProfileButton';

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [editButton, setEditButton] = useState('Edit Profile'); // the value of the editprofile button
  const [posts, setPosts] = useState([]); // userspost
  const [bio, setBio] = useState(); // variable for bio value
  const [following, setFollowing] = useState('0'); 
  const [followers, setFollowers] = useState('0'); 

  useEffect(() => {
    const getAccessToken = async (retry) => {
      if (retry > 3) {
        throw new Error('Maximum Request. Please refresh the page');
      }

      const accessToken = await getAccessTokenSilently();

      try {
        const data = await fetch(
          `${import.meta.env.EATS_BACKEND_BASE_URL}/post/users/id/posts`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // This is why we split the Authorization header
            },
          }
        ).then((res) => res.json());

        const followingData = await fetch(
          `${import.meta.env.EATS_BACKEND_BASE_URL}/follow/following/id`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // This is why we split the Authorization header
            },
          }
        ).then((res) => res.json());

        const followersData = await fetch(
          `${import.meta.env.EATS_BACKEND_BASE_URL}/follow/followers/id`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // This is why we split the Authorization header
            },
          }
        ).then((res) => res.json());

        setFollowers(followersData.length)
        setFollowing(followingData.length)
        setPosts(data);
      } catch (_) {
        getAccessToken(retry + 1); // To limit request
      }
    };

    getAccessToken(0);
  }, [getAccessTokenSilently]);

  const bioValue = (e) => {
    setBio(e.target.value);
  };

  return (
    isAuthenticated && (
      <Flex direction="column" gap="20px" py="25px">
        <Flex direction="column" align="center" py="10px" gap="10px">
          <Image
            style={{ borderRadius: '50%' }}
            src={user.picture}
            alt="profile"
          />
          <Text fontSize="xl">{`@${user.nickname}`}</Text>
        </Flex>
        <Flex justify="space-around">
          <Flex direction="column" align="center" w="70px">
            <Heading size="xl">{following} </Heading>
            {/* @todo: add the value of Following here */}
            <Text size="sm" opacity=".7">
              Following
            </Text>
          </Flex>
          <Flex direction="column" align="center" w="70px">
            <Heading size="xl">{followers}</Heading>
            {/* @todo: add the value of Followers here */}
            <Text size="sm" opacity=".7">
              Followers
            </Text>
          </Flex>
          <Flex direction="column" align="center" w="70px">
            <Heading size="xl">2.5M </Heading>
            {/* @todo: add the value of Likes here */}
            <Text size="sm" opacity=".7">
              Likes
            </Text>
          </Flex>
        </Flex>
        <ProfileButton
          name={user.name}
          picture={user.picture}
          nickname={user.nickname}
          buttonValue={editButton}
        />
        <Text align="center" maxH="200px" overflow="auto" py="20px">
          Bio
        </Text>
        {posts.length === 0 ? (
          <Center>
            <Text fontSize="2xl" as="b">
              No posts yet
            </Text>
          </Center>
        ) : (
          <Grid templateColumns="repeat(3, 1fr)" gap="10px">
            {posts.map((post) => (
              <Link key={post._id} to={`/app/post/${post._id}`}>
                <GridProfile userPost={post.image} height={167} />
              </Link>
            ))}
          </Grid>
        )}
      </Flex>
    )
  );
};

export default Profile;
