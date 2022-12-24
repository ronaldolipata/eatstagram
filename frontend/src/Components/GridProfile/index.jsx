import { GridItem, Image } from '@chakra-ui/react';

const GridProfile = ({ userPost, height }) => {
  // Replace image with optimize size using Cloudinary transformations
  const imageSource = userPost.replace(
     `userPost`, `userPost/h_${height*2}`
    // '/image/upload/',
    // `/image/upload/h_${height * 2}/` // 👈 Add multiplier to improve quality for retina display
  );

  return (
    <GridItem bg="blue.500" borderRadius="3px">
      <Image
        w="100%"
        h={`${height}px`}
        src={imageSource}
        alt="Photo"
        borderRadius="3px"
      />
    </GridItem>
  );
};

export default GridProfile;
