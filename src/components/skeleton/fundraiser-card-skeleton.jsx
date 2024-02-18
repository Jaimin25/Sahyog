import {
    AspectRatio,
    Avatar,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Heading,
    HStack,
    Progress,
    Skeleton,
    SkeletonCircle,
    Stack,
    Text,
} from '@chakra-ui/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import {
    checkForImage,
    checkYoutubeUrl,
    getYtVideoId,
} from '../../lib/utils';

const FundriaserCardSkeleton = ({
    fundraiserTitle,
    coverMediaUrl,
    creatorName,
    profilePicUrl,
    amountRaised,
    fundraiserGoal,
}) => {
    return (
        <Card
            maxW="sm"
            className="h-full w-full place-self-center"
            boxShadow="md"
        >
            <CardBody>
                <Skeleton>
                    {coverMediaUrl &&
                    checkForImage(coverMediaUrl) ? (
                        <div className="overflow-hidden rounded-lg">
                            <LazyLoadImage
                                src={coverMediaUrl}
                                className="aspect-video h-[200px] w-full cursor-pointer transition duration-500 hover:scale-110"
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
                </Skeleton>
                <Stack mt="6" spacing="3">
                    <Skeleton>
                        <Heading size="md">
                            {fundraiserTitle}
                        </Heading>
                    </Skeleton>
                    <HStack>
                        <SkeletonCircle>
                            <Avatar
                                src={profilePicUrl}
                                size="sm"
                            />
                        </SkeletonCircle>
                        <Skeleton width="50%">
                            <Text width="100%">
                                By{' '}
                                <span className="w-full font-semibold">
                                    {creatorName}
                                </span>
                            </Text>
                        </Skeleton>
                    </HStack>
                    <Skeleton>
                        <Text fontSize={'larger'}>
                            <span className="font-semibold">
                                ₹
                                {amountRaised
                                    .toLocaleString('en-IN')
                                    .toString()}
                            </span>{' '}
                            raised out of ₹
                            {fundraiserGoal
                                .toLocaleString('en-IN')
                                .toString()}
                        </Text>
                        <Progress
                            value={
                                (amountRaised / fundraiserGoal) *
                                100
                            }
                            size="xs"
                            colorScheme="teal"
                        />
                    </Skeleton>
                </Stack>
            </CardBody>
            <CardFooter>
                <ButtonGroup spacing="2" className="flex w-full">
                    <Skeleton width="50%">
                        <Button
                            variant="outline"
                            colorScheme="teal"
                            className="flex-1"
                        >
                            Share
                        </Button>
                    </Skeleton>
                    <Skeleton width="50%">
                        <Button
                            variant="solid"
                            colorScheme="teal"
                            className="flex-1"
                        >
                            Donate
                        </Button>
                    </Skeleton>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
};

export default FundriaserCardSkeleton;
