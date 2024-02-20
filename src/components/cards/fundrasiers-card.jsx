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
    Stack,
    Text,
} from '@chakra-ui/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import {
    checkForImage,
    checkYoutubeUrl,
    getYtVideoId,
} from '../../lib/utils';

const FundriaserCard = ({
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
            className="fundraiser-card-container h-full w-full place-self-center"
            boxShadow="md"
        >
            <CardBody>
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
                <Stack mt="6" spacing="3">
                    <Heading
                        size="md"
                        className="fundraiser-card-title"
                    >
                        {fundraiserTitle}
                    </Heading>
                    <HStack>
                        <Avatar src={profilePicUrl} size="sm" />
                        <Text>
                            By{' '}
                            <span className="font-semibold">
                                {creatorName}
                            </span>
                        </Text>
                    </HStack>
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
                            (amountRaised / fundraiserGoal) * 100
                        }
                        size="xs"
                        colorScheme="teal"
                    />
                </Stack>
            </CardBody>
            <CardFooter>
                <ButtonGroup spacing="2" className="flex w-full">
                    <Button
                        variant="outline"
                        colorScheme="teal"
                        className="
                        fundraiser-card-share-button
                        flex-1"
                    >
                        Share
                    </Button>
                    <Button
                        variant="solid"
                        colorScheme="teal"
                        className="fundraiser-card-donate-button flex-1"
                    >
                        Donate
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
};

export default FundriaserCard;
