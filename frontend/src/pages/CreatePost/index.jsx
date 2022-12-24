import { useAuth0 } from '@auth0/auth0-react';
import { createRef, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  Textarea,
  Flex,
  Image,
  Text,
  Container,
} from '@chakra-ui/react';
import styles from './styles.modules.css';

const CreatePost = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [image, setImage] = useState(null);
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [button, setButton] = useState(false);

  const refInputFile = useRef(null);
  const navigate = useNavigate(null);

  const refImage = createRef();

  // useMemo React Hooks is to remember the value when the component change WITHOUT re-render
  const imageRender = useMemo(
    () => (image !== null ? URL.createObjectURL(image) : null),
    [image]
  );

  const handleContentOnChange = (event) => {
    setContent(event.target.value);
  };

  // Click input file when Upload button is clicked
  const uploadOnClick = () => {
    refInputFile.current.click();
  };

  // Get the selected image from input file and pass into image state
  const uploadImageOnChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  // Validate image height before uploading
  const validateImageHeight = () => {
    setError(null);

    if (refImage.current.clientHeight < 500) {
      setError('Image should be portrait and has a minimum height of 500px');
    }
  };

  const createPost = async (postContent, imageUrl) => {
    const accessToken = await getAccessTokenSilently();

    try {
      const response = await fetch(
        `${import.meta.env.EATS_BACKEND_BASE_URL}/post`,
        {
          method: 'POST',
          body: JSON.stringify({
            content: postContent,
            image: imageUrl,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      }

      // @todo: Do not navigate when error
      // Navigate to home page once posted
      navigate('/app/home');
    } catch (e) {
      setError(e);
    }
  };

  const uploadImage = async () => {
    if (!content) {
      // console.log(refImage.current.clientHeight);
      setError('Content is required.');

      return; // Return nothing to stop the codes below
    }

    setButton(true);

    const accessToken = await getAccessTokenSilently();

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch(
        `${import.meta.env.EATS_BACKEND_BASE_URL}/upload`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      }

      // @todo: Instead of message, use the status code as validator
      if (data.message === 'Success') {
        createPost(content, data.url);
      }
    } catch (e) {
      setError(e);
    }
  };

  return (
    <>
      <Input
        display="none"
        onChange={uploadImageOnChange}
        ref={refInputFile}
        className={styles.inputFile}
        type="file"
        accept="image/*"
        width="100%"
      />
      <Flex
        direction="column"
        align="center"
        height={image ? 'max-content' : '100%'}
        justify="center"
      >
        {image !== null ? (
          <Flex flexDirection="column" gap="0.5rem">
            <Image
              ref={refImage}
              onLoad={validateImageHeight}
              className={styles.img}
              src={imageRender}
              alt="Upload"
            />
            <Textarea
              marginBottom="1rem"
              onChange={handleContentOnChange}
              placeholder="Enter content"
              size="lg"
              rows={10}
              disabled={button}
              autoFocus
            />
            {error && (
              <Text as="strong" color="red" paddingBottom="2rem">
                {error}
              </Text>
            )}
            <Container paddingBottom={4} paddingX={0}>
              {button ? (
                <Button
                  marginTop={2}
                  marginBottom={2}
                  onClick={uploadImage}
                  width="100%"
                  colorScheme="teal"
                  isLoading
                  loadingText="Posting"
                >
                  Submitting
                </Button>
              ) : (
                <>
                  <Button onClick={uploadOnClick} color="teal" width="100%">
                    Replace Image
                  </Button>
                  <Button
                    marginTop={2}
                    marginBottom={2}
                    onClick={uploadImage}
                    width="100%"
                    colorScheme="teal"
                  >
                    Post
                  </Button>
                </>
              )}
            </Container>
          </Flex>
        ) : (
          <Button onClick={uploadOnClick} colorScheme="teal" width="100%">
            Upload File
          </Button>
        )}
      </Flex>
    </>
  );
};

export default CreatePost;
