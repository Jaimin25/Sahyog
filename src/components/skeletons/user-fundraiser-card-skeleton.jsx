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
            className="place-self-center"
            border="1px"
            borderColor="gray.200"
        >
            <CardBody>
                <div className="flex flex-col items-center gap-3 md:flex-row">
                    <Skeleton>
                        {coverMediaUrl &&
                            checkForImage(coverMediaUrl) && (
                                <div className="overflow-hidden rounded-lg">
                                    <LazyLoadImage
                                        src={coverMediaUrl}
                                        className="aspect-video h-[200px] w-full cursor-pointer transition duration-500 hover:scale-110"
                                    />
                                </div>
                            )}
                    </Skeleton>
                    <Stack justifyContent="center" width="100%">
                        <Skeleton>
                            <Text fontWeight="semibold">
                                {fundraiserTitle || 'Untitled'}
                            </Text>
                        </Skeleton>
                        <Skeleton>
                            <Text>
                                Fundraiser created{' '}
                                {timeSince(new Date(createdAt))}
                            </Text>
                        </Skeleton>
                        <ButtonGroup>
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
                </div>
            </CardBody>
        </Card>
    );
};

export default UserFundraiserCardSkeleton;
