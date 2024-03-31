import {
  AspectRatio,
  Button,
  ButtonGroup,
  Divider,
  Editable,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
  useEditableControls,
} from '@chakra-ui/react';
import { generateUploadDropzone } from '@uploadthing/react';
import { CheckIcon, Link, X } from 'lucide-react';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { baseapiurl, checkForImage, checkYoutubeUrl, getYtVideoId } from '../../../../lib/utils';

const UploadButton = generateUploadDropzone({
  url: `${baseapiurl}/api/uploadthing`,
});

const EditFundraiserCoverMedia = ({ fundraiser, fundraiserCoverMediaUrl, setFundraiserCoverMediaUrl }) => {
  const [editing, setEditing] = useState();
  const [error, setError] = useState(null);
  const [coverMediaUrl, setCoverMediaUrl] = useState(null);

  function EditableControls() {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();
    setEditing(isEditing);
    setCoverMediaUrl(null);
    return isEditing ? (
      <ButtonGroup className="flex items-center" size="sm">
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<X />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Button variant="outline" {...getEditButtonProps()}>
        Change
      </Button>
    );
  }

  return (
    <Editable
      textAlign="left"
      defaultValue={fundraiser.fundraiserstory}
      className="flex flex-col items-center gap-2"
      isPreviewFocusable={false}
    >
      <div className="w-11/12">
        {!editing &&
          (fundraiserCoverMediaUrl && checkForImage(fundraiserCoverMediaUrl) ? (
            <div className="w-full flex-1 overflow-hidden rounded-lg">
              <LazyLoadImage
                src={fundraiserCoverMediaUrl}
                className="aspect-video h-auto w-auto rounded-lg lg:h-[300px]"
                alt="cover-media"
              />
            </div>
          ) : fundraiserCoverMediaUrl && checkYoutubeUrl(fundraiser.coverMediaUrl) ? (
            <AspectRatio maxW="100%" ratio={16 / 9} borderRadius="lg" height="300px" className="flex-1">
              <iframe
                className="rounded-lg"
                src={`https://www.youtube.com/embed/${getYtVideoId(fundraiser.coverMediaUrl)}`}
                allowFullScreen
              />
            </AspectRatio>
          ) : null)}
      </div>
      <div className="flex w-full items-center justify-center">
        {editing &&
        !(coverMediaUrl ? checkYoutubeUrl(coverMediaUrl) || checkForImage(coverMediaUrl) : !!coverMediaUrl) ? (
          <Stack direction="column" width="50%">
            <Text fontWeight="semibold">Upload a cover photo</Text>
            <UploadButton
              className=""
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setFundraiserCoverMediaUrl(res[0].url);
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
                value={fundraiserCoverMediaUrl}
                onChange={(e) => {
                  setFundraiserCoverMediaUrl(e.target.value);
                }}
              />
            </InputGroup>
          </Stack>
        ) : null}
      </div>
      <EditableControls />
    </Editable>
  );
};

export default EditFundraiserCoverMedia;
