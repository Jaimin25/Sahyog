import {
    AspectRatio,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    Stack,
    Text,
} from '@chakra-ui/react';
import { ImageOff } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { NavLink } from 'react-router-dom';

import {
    checkForImage,
    checkYoutubeUrl,
    getYtVideoId,
    timeSince,
} from '../../lib/utils';

const UserFundraisersDraftCard = ({
    fundraiserTitle,
    coverMediaUrl,
    createdAt,
}) => {
    return (
        <Card
            className="h-full w-full place-self-center"
            border="1px"
            borderColor="gray.200"
        >
            <CardBody>
                <Stack direction="row">
                    {!coverMediaUrl && (
                        <div className="flex h-auto w-[200px] items-center justify-center rounded-lg bg-gray-200">
                            <ImageOff />
                        </div>
                    )}
                    {coverMediaUrl &&
                    checkForImage(coverMediaUrl) ? (
                        <div className="overflow-hidden rounded-lg">
                            <LazyLoadImage
                                src={coverMediaUrl}
                                className="aspect-video h-auto w-[200px] cursor-pointer transition duration-500 hover:scale-110"
                            />
                        </div>
                    ) : coverMediaUrl &&
                      checkYoutubeUrl(coverMediaUrl) ? (
                        <AspectRatio
                            maxW="100%"
                            ratio={16 / 9}
                            borderRadius="lg"
                            height="200px"
                        >
                            <iframe
                                title="naruto"
                                className="rounded-lg"
                                src={`https://www.youtube.com/embed/${getYtVideoId(coverMediaUrl)}`}
                                allowFullScreen
                            />
                        </AspectRatio>
                    ) : null}
                    <Stack>
                        <Text fontWeight="semibold">
                            {fundraiserTitle || 'Untitled'}
                        </Text>
                        <Text>
                            Fundraiser created{' '}
                            {timeSince(new Date(createdAt))}
                        </Text>
                        <ButtonGroup>
                            <NavLink to="/fundraiser/create">
                                <Button
                                    variant="outline"
                                    colorScheme="teal"
                                >
                                    Edit
                                </Button>
                            </NavLink>
                        </ButtonGroup>
                    </Stack>
                </Stack>
            </CardBody>
        </Card>
    );
};

export default UserFundraisersDraftCard;
