import '@uploadthing/react/styles.css';

import {
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
            {coverMediaUrl && (
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
            )}

            {!coverMediaUrl && (
                <>
                    <Text fontWeight="semibold">
                        Add a cover photo
                    </Text>
                    <UploadButton
                        className=""
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            setCoverMediaUrl(res[0].url);
                        }}
                        onUploadError={(error) => {
                            console.log(error);
                            setError(
                                error.message.trim() ===
                                    'File limit exceeded'
                                    ? 'Please select 1 file only'
                                    : error.message.trim() ===
                                          'Unable to get presigned urls' &&
                                          'Unable to upload image, please check your file size'
                            );
                        }}
                        onUploadBegin={(name) => {
                            console.log('Uploading: ', name);
                        }}
                        onBeforeUploadBegin={(files) => {
                            console.log(files);
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
                        <Input placeholder="Add a YouTube link" />
                    </InputGroup>
                </>
            )}
        </Stack>
    );
};

export default FundraiserFormThree;
