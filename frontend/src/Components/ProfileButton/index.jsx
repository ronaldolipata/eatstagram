import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  Input,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

const ProfileButton = ({
  name, picture, buttonValue, nickname,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState(picture);
  const [theName, setTheName] = useState(name);
  const [theNickname, setTheNickName] = useState(nickname);
  const refInputFile = useRef(null);

  const updateImage = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const changeName = (event) => {
    setTheName(event.target.value);
  };

  const changeNickName = (event) => {
    setTheNickName(event.target.value);
  };

  const updatePhoto = () => {
    refInputFile.current.click();
  };

  return (
    <>
      <Button onClick={onOpen} w="max-content" alignSelf="center">
        {buttonValue}
      </Button>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <Flex
            borderBottomWidth="1px"
            p="10px"
            justify="space-between"
            mb="50px"
            align="center"
          >
            <Button onClick={onClose}>
              <CloseIcon />
            </Button>
            <Text>Edit Profile</Text>
            <Button>
              <CheckIcon />
            </Button>
          </Flex>
          <Flex direction="column" align="center" jsutify="center" gap="100px">
            <Flex direction="column">
              <Button
                borderRadius="50%"
                h="max-content"
                p="0px"
                onClick={updatePhoto}
              >
                <Image src={image} borderRadius="50%" w="100px" h="100px" />
              </Button>
              <Text>UpdatePhoto</Text>
            </Flex>
            <Input
              display="none"
              onChange={updateImage}
              ref={refInputFile}
              type="file"
              accept="image/*"
              width="100%"
            />
            <Flex direction="column" w="250px">
              <Text>Name:</Text>
              <Input
                type="text"
                name="name"
                onChange={changeName}
                value={theName}
                mb="10px"
              />
              <Text>Nickname:</Text>
              <Input
                type="text"
                name="nickname"
                onChange={changeNickName}
                value={theNickname}
                mb="10px"
              />
              <Text>Bio:</Text>
              <Textarea />
            </Flex>
          </Flex>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ProfileButton;
