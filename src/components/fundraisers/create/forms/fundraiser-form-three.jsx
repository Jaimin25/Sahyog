import '@uploadthing/react/styles.css';

import {
    AspectRatio,
    Button,
    Divider,
    HStack,
    Image,
    Input,
    InputGroup,
    InputLeftAddon,
    Stack,
    Text,
} from '@chakra-ui/react';
import { generateUploadDropzone } from '@uploadthing/react';
import { Link } from 'lucide-react';
import { useState } from 'react';

import {
    checkForImage,
    checkYoutubeUrl,
    getYtVideoId,
} from '../../../../lib/utils';

const UploadButton = generateUploadDropzone({
    url: ` https://8f575d30c9f3b2.lhr.life/api/uploadthing`,
});
const FundraiserFormThree = ({
    coverMediaUrl,
    setCoverMediaUrl,
}) => {
    const [error, setError] = useState(null);

    return (
        <Stack>
            {coverMediaUrl && checkForImage(coverMediaUrl) ? (
                <>
                    <Image src={coverMediaUrl} />
                    <Stack>
                        <Button
                            onClick={() =>
                                setCoverMediaUrl(null)
                            }
                        >
                            Remove
                        </Button>
                    </Stack>
                </>
            ) : coverMediaUrl &&
              checkYoutubeUrl(coverMediaUrl) ? (
                <>
                    <AspectRatio maxW="100%" ratio={16 / 9}>
                        <iframe
                            title="naruto"
                            src={`https://www.youtube.com/embed/${getYtVideoId(coverMediaUrl)}`}
                            allowFullScreen
                        />
                    </AspectRatio>
                    <Button
                        onClick={() => setCoverMediaUrl(null)}
                    >
                        Remove
                    </Button>
                </>
            ) : null}

            {!(coverMediaUrl
                ? checkYoutubeUrl(coverMediaUrl) ||
                  checkForImage(coverMediaUrl)
                : !!coverMediaUrl) ? (
                <>
                    <Text fontWeight="semibold">
                        Upload a cover photo
                    </Text>
                    <UploadButton
                        className=""
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            setCoverMediaUrl(res[0].url);
                        }}
                        onUploadError={(error) => {
                            setError(
                                error.message.trim() ===
                                    'File limit exceeded'
                                    ? 'Please select 1 file only'
                                    : error.message.trim() ===
                                          'Unable to get presigned urls' &&
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
