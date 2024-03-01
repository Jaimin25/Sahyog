import {
    AspectRatio,
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Heading,
    Stack,
    Text,
} from '@chakra-ui/react';
import { Markup } from 'interweave';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { NavLink } from 'react-router-dom';

import {
    checkForImage,
    checkYoutubeUrl,
    getYtVideoId,
    timeSince,
} from '../../../../lib/utils';

const FundraiserDetailsSection = ({
    fundraiser,
    isFetchingFundraiser,
}) => {
    return (
        <Card boxShadow="md" className="col-span-2">
            <CardHeader>
                <Heading>{fundraiser.fundraiserTitle}</Heading>
            </CardHeader>
            <CardBody>
                <Stack spacing="20px">
                    <Stack alignItems="center">
                        {fundraiser.coverMediaUrl &&
                        checkForImage(
                            fundraiser.coverMediaUrl
                        ) ? (
                            <div className="overflow-hidden rounded-lg">
                                <LazyLoadImage
                                    src={
                                        fundraiser.coverMediaUrl
                                    }
                                    className="aspect-video h-[400px] w-auto"
                                />
                            </div>
                        ) : fundraiser.coverMediaUrl &&
                          checkYoutubeUrl(
                              fundraiser.coverMediaUrl
                          ) ? (
                            <AspectRatio
                                maxW="auto"
                                ratio={16 / 9}
                                borderRadius="lg"
                                height="400px"
                            >
                                <iframe
                                    className="rounded-lg"
                                    src={`https://www.youtube.com/embed/${getYtVideoId(fundraiser.coverMediaUrl)}`}
                                    allowFullScreen
                                />
                            </AspectRatio>
                        ) : null}
                    </Stack>
                    <Stack direction="row" alignItems="center">
                        <Avatar src={fundraiser.profilePicUrl} />
                        <Text>
                            {fundraiser.creatorName} is
                            organizing this fundraiser.
                        </Text>
                    </Stack>
                    <Divider />
                    <Stack>
                        <Text>
                            Created{' '}
                            {timeSince(
                                new Date(fundraiser.createdAt)
                            )}
                        </Text>
                    </Stack>
                    <Divider />
                    <Stack>
                        <Text>
                            <Markup
                                content={
                                    fundraiser.fundraiserStory
                                }
                            />
                        </Text>
                    </Stack>
                    <Stack>
                        <ButtonGroup
                            spacing="2"
                            className="flex w-full"
                        >
                            <Box className="w-full flex-1">
                                {' '}
                                <Button
                                    variant="outline"
                                    colorScheme="teal"
                                    className="
                        fundraiser-card-share-button
                        w-full"
                                >
                                    Share
                                </Button>
                            </Box>

                            <NavLink
                                to={`/fundraiser/${fundraiser._id}/donate`}
                                className="flex-1"
                            >
                                <Button
                                    variant="outline"
                                    colorScheme="teal"
                                    className="fundraiser-card-donate-button w-full flex-1"
                                >
                                    Donate
                                </Button>
                            </NavLink>
                        </ButtonGroup>
                    </Stack>
                    <Divider />
                    <Stack spacing="20px">
                        <Heading size="md">Organizer</Heading>
                        <Stack direction="row">
                            <Box>
                                <Avatar
                                    src={
                                        fundraiser.profilePicUrl
                                    }
                                    size="sm"
                                    marginY="8px"
                                    marginX="4px"
                                />
                            </Box>
                            <Box>
                                <Text fontWeight="semibold">
                                    {fundraiser.creatorName}
                                </Text>
                                <Text fontSize="sm">
                                    Organizer
                                </Text>
                                <Text fontSize="sm">
                                    {fundraiser.fundraiserCity},{' '}
                                    {fundraiser.fundraiserState}
                                </Text>
                            </Box>
                        </Stack>
                    </Stack>
                </Stack>
            </CardBody>
        </Card>
    );
};

export default FundraiserDetailsSection;
