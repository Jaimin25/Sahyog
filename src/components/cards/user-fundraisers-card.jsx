import {
    AspectRatio,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    Stack,
    Text,
} from '@chakra-ui/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import {
    checkForImage,
    checkYoutubeUrl,
    getYtVideoId,
    timeSince,
} from '../../lib/utils';

const UserActiveFundraisersCard = ({
    fundraiserTitle,
    coverMediaUrl,
    createdAt,
}) => {
    const timesince = new Date(createdAt);

    return (
        <Card
            className="user-fundraisers-card-container h-full w-full place-self-center"
            border="1px"
            borderColor="gray.200"
            boxShadow="sm"
        >
            <CardBody>
                <div className="flex flex-col items-center gap-3 md:flex-row">
                    {coverMediaUrl &&
                    checkForImage(coverMediaUrl) ? (
                        <div className="overflow-hidden rounded-lg">
                            <LazyLoadImage
                                src={coverMediaUrl}
                                className="aspect-video h-auto w-[250px] cursor-pointer transition duration-500 hover:scale-110"
                            />
                        </div>
                    ) : coverMediaUrl &&
                      checkYoutubeUrl(coverMediaUrl) ? (
                        <AspectRatio
                            width="250px"
                            ratio={16 / 9}
                            borderRadius="lg"
                            height="auto"
                        >
                            <iframe
                                width="250px"
                                className="w-[250px] rounded-lg"
                                src={`https://www.youtube.com/embed/${getYtVideoId(coverMediaUrl)}`}
                                allowFullScreen
                            />
                        </AspectRatio>
                    ) : null}
                    <Stack>
                        <Text
                            fontWeight="semibold"
                            className="user-fundriaser-card-title"
                        >
                            {fundraiserTitle}
                        </Text>
                        <Text>
                            Fundraiser created{' '}
                            {timeSince(timesince)}
                        </Text>
                        <ButtonGroup>
                            <Button
                                variant="outline"
                                colorScheme="teal"
                            >
                                Manage
                            </Button>
                            <Button
                                variant="outline"
                                colorScheme="teal"
                            >
                                View
                            </Button>
                        </ButtonGroup>
                    </Stack>
                </div>
            </CardBody>
        </Card>
    );
};

export default UserActiveFundraisersCard;
