import { AspectRatio, Button, Divider, Stack, Text } from '@chakra-ui/react';
import { Markup } from 'interweave';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { checkForImage, checkYoutubeUrl, getYtVideoId } from '../../../../lib/utils';

const FundraiserFormPublish = ({
  setActiveStep,
  coverMediaUrl,
  fundraiserCause,
  fundraiserGoal,
  fundraiserCity,
  fundraiserState,
  fundraiserTitle,
  fundraiserStory,
}) => {
  return (
    <Stack gap="10px" className="fundraiser-form-publish">
      <div className="flex items-center">
        <Text fontWeight="semibold" fontSize="xl" className="flex-1">
          Cover Media
        </Text>
        <div>
          <Button colorScheme="teal" variant="outline" onClick={() => setActiveStep(2)}>
            Edit
          </Button>
        </div>
      </div>
      {coverMediaUrl && checkForImage(coverMediaUrl) ? (
        <div className="overflow-hidden rounded-lg">
          <LazyLoadImage
            src={coverMediaUrl}
            className="aspect-video h-[300px] w-full cursor-pointer transition duration-500 hover:scale-110"
            alt={fundraiserTitle}
          />
        </div>
      ) : coverMediaUrl && checkYoutubeUrl(coverMediaUrl) ? (
        <AspectRatio maxW="100%" ratio={16 / 9}>
          <iframe src={`https://www.youtube.com/embed/${getYtVideoId(coverMediaUrl)}`} allowFullScreen />
        </AspectRatio>
      ) : null}
      <div className="flex items-center">
        <div className="flex flex-1 flex-col">
          <Text fontWeight="semibold" fontSize="xl">
            Title
          </Text>
          <Text>{fundraiserTitle}</Text>
        </div>
        <div>
          <Button colorScheme="teal" variant="outline" onClick={() => setActiveStep(3)}>
            Edit
          </Button>
        </div>
      </div>
      <Divider />
      <div className="flex items-center">
        <div className="flex flex-1 flex-col">
          <Text fontWeight="semibold" fontSize="xl">
            Goal
          </Text>
          <Text>₹{fundraiserGoal}</Text>
        </div>
        <div>
          <Button colorScheme="teal" variant="outline" onClick={() => setActiveStep(1)}>
            Edit
          </Button>
        </div>
      </div>

      <Divider />
      <div className="flex items-center">
        <div className="flex flex-1 flex-col">
          <Text fontWeight="semibold" fontSize="xl">
            Category
          </Text>
          <Text>{fundraiserCause}</Text>
        </div>
        <div>
          <Button colorScheme="teal" variant="outline" onClick={() => setActiveStep(1)}>
            Edit
          </Button>
        </div>
      </div>
      <Divider />
      <div className="flex items-center">
        <div className="flex flex-1 flex-col">
          <Text fontWeight="semibold" fontSize="xl">
            Story
          </Text>
          <Markup content={fundraiserStory} className="h-[100px] overflow-y-auto" />
        </div>
        <div>
          <Button colorScheme="teal" variant="outline" onClick={() => setActiveStep(3)}>
            Edit
          </Button>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex flex-1 flex-col">
          <Text fontWeight="semibold" fontSize="xl">
            Location
          </Text>
          <Text>
            {fundraiserCity}, {fundraiserState}
          </Text>
        </div>
        <div>
          <Button colorScheme="teal" variant="outline" onClick={() => setActiveStep(0)}>
            Edit
          </Button>
        </div>
      </div>
    </Stack>
  );
};

export default FundraiserFormPublish;
