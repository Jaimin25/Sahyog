import { AspectRatio, Button, Divider, HStack, Input, InputGroup, InputLeftAddon, Stack, Text } from '@chakra-ui/react';
import { generateUploadDropzone } from '@uploadthing/react';
import { Link } from 'lucide-react';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { baseapiurl, checkForImage, checkYoutubeUrl, getYtVideoId } from '../../../../lib/utils';

const UploadButton = generateUploadDropzone({
  url: `${baseapiurl}/api/uploadthing`,
});

const FundraiserFormThree = ({ coverMediaUrl, setCoverMediaUrl }) => {
  const [error, setError] = useState(null);

  return (
    <Stack className="fundraiser-form-covermedia">
      {coverMediaUrl && checkForImage(coverMediaUrl) ? (
        <>
          <div className="overflow-hidden rounded-lg">
            <LazyLoadImage
              src={coverMediaUrl}
              className="aspect-video h-[300px] w-full cursor-pointer transition duration-500 hover:scale-110"
              alt="cover-media"
            />
          </div>
          <Stack>
            <Button colorScheme="red" onClick={() => setCoverMediaUrl(null)}>
              Remove
            </Button>
          </Stack>
        </>
      ) : coverMediaUrl && checkYoutubeUrl(coverMediaUrl) ? (
        <>
          <AspectRatio maxW="100%" ratio={16 / 9}>
            <iframe src={`https://www.youtube.com/embed/${getYtVideoId(coverMediaUrl)}`} allowFullScreen />
          </AspectRatio>
          <Button onClick={() => setCoverMediaUrl(null)} colorScheme="red">
            Remove
          </Button>
        </>
      ) : null}

      {!(coverMediaUrl ? checkYoutubeUrl(coverMediaUrl) || checkForImage(coverMediaUrl) : !!coverMediaUrl) ? (
        <>
          <Text fontWeight="semibold">Upload a cover photo</Text>
          <UploadButton
            className=""
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setCoverMediaUrl(res[0].url);
            }}
            onUploadError={(error) => {
              setError(
                error.message.trim() === 'File limit exceeded'
                  ? 'Please select 1 file only'
                  : error.message.trim() === 'Unable to get presigned urls' &&
                      'Unable to upload image, please check your file size'
              );
            }}
          />
          <Text color="red.500">{error}</Text>
          <HStack>
            <Divider />
            <Text>OR</Text>
            <Divider />
          </HStack>
          <InputGroup>
            <InputLeftAddon>
              <Link />
            </InputLeftAddon>
            <Input
              placeholder="Add a YouTube or Image link"
              value={coverMediaUrl}
              onChange={(e) => {
                setCoverMediaUrl(e.target.value);
              }}
            />
          </InputGroup>
        </>
      ) : null}
    </Stack>
  );
};

export default FundraiserFormThree;
