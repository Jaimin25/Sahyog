import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    Skeleton,
    Stack,
    Text,
} from '@chakra-ui/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { checkForImage, timeSince } from '../../lib/utils';

const UserFundraiserCardSkeleton = ({
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
                    <Skeleton>
                        {coverMediaUrl &&
                            checkForImage(coverMediaUrl) && (
                                <div className="overflow-hidden rounded-lg">
                                    <LazyLoadImage
                                        src={coverMediaUrl}
                                        className="aspect-video h-auto w-[200px] cursor-pointer transition duration-500 hover:scale-110"
                                    />
                                </div>
                            )}
                    </Skeleton>
                    <Stack width="50%" justifyContent="center">
                        <Skeleton width="75%">
                            <Text fontWeight="semibold">
                                {fundraiserTitle || 'Untitled'}
                            </Text>
                        </Skeleton>
                        <Skeleton width="75%">
                            <Text>
                                Fundraiser created{' '}
                                {timeSince(new Date(createdAt))}
                            </Text>
                        </Skeleton>
                        <ButtonGroup width="50%">
                            <Skeleton width="100%">
                                <Button
                                    variant="outline"
                                    colorScheme="teal"
                                >
                                    Edit
                                </Button>
                            </Skeleton>
                            <Skeleton width="100%">
                                <Button
                                    variant="outline"
                                    colorScheme="teal"
                                >
                                    Edit
                                </Button>
                            </Skeleton>
                        </ButtonGroup>
                    </Stack>
                </Stack>
            </CardBody>
        </Card>
    );
};

export default UserFundraiserCardSkeleton;
