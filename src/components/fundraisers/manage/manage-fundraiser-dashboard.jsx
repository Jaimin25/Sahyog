import {
    AspectRatio,
    Box,
    Button,
    ButtonGroup,
    Divider,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    StackDivider,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import { Markup } from 'interweave';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';

import {
    baseapiurl,
    capitalizeString,
    checkForImage,
    checkYoutubeUrl,
    getYtVideoId,
} from '../../../lib/utils';
import { useSession } from '../../providers/session-provider';

const ManageFundraiserDashboard = ({
    fundraiser,
    isFundraiserFetching,
}) => {
    const { user, accessToken } = useSession();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleDeleteFundraiser = async () => {
        setLoading(true);
        try {
            const res = await axios.post(
                `${baseapiurl}/api/user/deleteFundraiser`,
                {
                    uid: user.id,
                    access_token: accessToken,
                    fundraiserId: fundraiser._id,
                }
            );
            const resData = res.data;

            if (resData.statusCode === 200) {
                setLoading(false);
                navigate('/');
            } else {
                setLoading(false);
            }
            setLoading(false);
        } catch (e) {}
    };
    return (
        <>
            <div className="flex flex-col gap-4">
                <Stack>
                    <Box className="flex">
                        <Box className="flex-1">
                            <Text
                                fontWeight="semibold"
                                fontSize="20px"
                            >
                                Title
                            </Text>
                            <Text>
                                {fundraiser.fundraiserTitle}
                            </Text>
                        </Box>
                        <Button variant="outline">Edit</Button>
                    </Box>
                    <StackDivider />
                    <Divider />
                    <Box className="flex">
                        <Box className="flex-1">
                            <Text
                                fontWeight="semibold"
                                fontSize="20px"
                            >
                                Goal
                            </Text>
                            <Text>
                                {' '}
                                ₹
                                {fundraiser.fundraiserGoal
                                    .toLocaleString()
                                    .toString()}
                            </Text>
                        </Box>
                        <Button variant="outline">Edit</Button>
                    </Box>
                    <StackDivider />
                    <Divider />
                    <Box className="w-full">
                        <Box className="flex w-full items-center">
                            <Text
                                fontWeight="semibold"
                                fontSize="20px"
                                flex="1"
                            >
                                Cover Media
                            </Text>
                            <Button variant="outline">
                                Change
                            </Button>
                        </Box>
                        {fundraiser.coverMediaUrl &&
                        checkForImage(
                            fundraiser.coverMediaUrl
                        ) ? (
                            <div className="overflow-hidden rounded-lg">
                                <LazyLoadImage
                                    src={
                                        fundraiser.coverMediaUrl
                                    }
                                    className="aspect-video h-auto w-auto rounded-lg md:h-[400px]"
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
                                height="auto"
                            >
                                <iframe
                                    className="rounded-lg"
                                    src={`https://www.youtube.com/embed/${getYtVideoId(fundraiser.coverMediaUrl)}`}
                                    allowFullScreen
                                />
                            </AspectRatio>
                        ) : null}
                    </Box>
                    <StackDivider />
                    <Divider />
                    <Box className="flex">
                        <Box className="flex-1">
                            <Text
                                fontWeight="semibold"
                                fontSize="20px"
                            >
                                Story
                            </Text>
                            <Markup
                                content={
                                    fundraiser.fundraiserStory
                                }
                            />
                        </Box>
                        <Button variant="outline">Edit</Button>
                    </Box>
                    <StackDivider />
                    <Divider />
                    <Box className="flex">
                        <Box className="flex-1">
                            <Text
                                fontWeight="semibold"
                                fontSize="20px"
                            >
                                Category
                            </Text>
                            <Text>
                                {capitalizeString(
                                    fundraiser.fundraiserCause
                                )}
                            </Text>
                        </Box>
                        <Button variant="outline">Edit</Button>
                    </Box>
                    <StackDivider />
                    <Divider />
                    <Box className="flex">
                        <Box className="flex-1">
                            <Text
                                fontWeight="semibold"
                                fontSize="20px"
                            >
                                Location
                            </Text>
                            <Text>
                                {fundraiser.fundraiserCity},{' '}
                                {fundraiser.fundraiserState} -{' '}
                                {fundraiser.zipCode}
                            </Text>
                        </Box>
                        <Button variant="outline">Edit</Button>
                    </Box>
                </Stack>
                <Box className="flex justify-end">
                    {' '}
                    <ButtonGroup>
                        <Button
                            colorScheme="red"
                            onClick={onOpen}
                        >
                            Delete
                        </Button>
                        <Button colorScheme="teal">Save</Button>
                    </ButtonGroup>
                </Box>
            </div>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Fundraiser</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>
                            Are you sure, you want to delete this
                            fundraiser? This task is
                            irreversible.
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            variant="solid"
                            colorScheme="green"
                            onClick={handleDeleteFundraiser}
                            isLoading={loading}
                        >
                            Confirm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ManageFundraiserDashboard;
