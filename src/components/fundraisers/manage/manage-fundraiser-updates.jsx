import {
    Badge,
    Box,
    Button,
    Card,
    CardBody,
    Heading,
    Stack,
    useToast,
} from '@chakra-ui/react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { Markup } from 'interweave';
import { useState } from 'react';

import { baseapiurl } from '../../../lib/utils';
import { useSession } from '../../providers/session-provider';

const ManageFundraiserUpdates = ({
    fundraiser,
    fundraiserUpdates,
    setFundraiserUpdates,
    isFetchingFundraiserUpdates,
}) => {
    const toast = useToast();
    const { user, accessToken } = useSession();
    const [updateDetails, setUpdateDetails] = useState();
    const [isPosting, setIsPosting] = useState();

    const handleDeleteUpdate = async (updateId) => {
        try {
            const res = await axios.post(
                `${baseapiurl}/api/fundraiser/deleteFundraiserUpdate`,
                {
                    uid: user.id,
                    access_token: accessToken,
                    fundraiserId: fundraiser._id,
                    updateId,
                }
            );
            const resData = res.data;
            if (resData.statusCode === 200) {
                setFundraiserUpdates(
                    fundraiserUpdates.filter(
                        (update) => update._id !== updateId
                    )
                );
                toast({
                    title: 'Update deleted',
                    status: 'success',
                    position: 'top-right',
                    duration: 1000,
                });
            } else {
                toast({
                    title: 'Error',
                    description: resData.message,
                    status: 'error',
                    position: 'top-right',
                    duration: 1000,
                });
            }
        } catch (e) {
            toast({
                title: 'Error',
                description: e.message,
                status: 'error',
                position: 'top-right',
                duration: 1000,
            });
        }
    };
    const handlePostUpdates = async () => {
        setIsPosting(true);
        try {
            const res = await axios.post(
                `${baseapiurl}/api/fundraiser/postFundraiserUpdate`,
                {
                    uid: user.id,
                    access_token: accessToken,
                    fundraiserId: fundraiser._id,
                    updateDetails,
                }
            );

            const resData = res.data;

            if (resData.statusCode === 200) {
                setIsPosting(false);
                setUpdateDetails('');
                setFundraiserUpdates([
                    resData.fundraiserUpdate,
                    ...fundraiserUpdates,
                ]);
                toast({
                    title: 'Updated posted',
                    status: 'success',
                    position: 'top-right',
                    duration: 1000,
                });
            } else {
                toast({
                    title: 'Error',
                    description: resData.message,
                    status: 'error',
                    position: 'top-right',
                    duration: 1000,
                });
                setIsPosting(false);
            }
            setIsPosting(false);
        } catch (e) {
            setIsPosting(false);
            toast({
                title: 'Error',
                description: e.message,
                status: 'error',
                position: 'top-right',
                duration: 1000,
            });
        }
    };

    return (
        <Stack gap="16px">
            <Box className="space-y-4">
                <Heading size="lg">Post an update</Heading>
                <Box height="300px">
                    <Editor
                        apiKey={
                            import.meta.env.VITE_TINYMCE_API_KEY
                        }
                        onEditorChange={(c) =>
                            setUpdateDetails(c)
                        }
                        value={updateDetails}
                        disabled={isFetchingFundraiserUpdates}
                        init={{
                            height: '100%',
                            menubar: false,
                            plugins: [
                                'advlist',
                                'autolink',
                                'lists',
                                'link',
                                'image',
                                'charmap',
                                'preview',
                                'anchor',
                                'searchreplace',
                                'visualblocks',
                                'code',
                                'fullscreen',
                                'insertdatetime',
                                'media',
                                'table',
                                'code',
                                'help',
                                'wordcount',
                            ],
                            toolbar:
                                'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify ',
                            content_style:
                                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        }}
                    />
                </Box>
                <Box textAlign="end">
                    <Button
                        colorScheme="teal"
                        isDisabled={!updateDetails}
                        isLoading={isPosting}
                        onClick={handlePostUpdates}
                    >
                        Post
                    </Button>
                </Box>
            </Box>
            <Box className="space-y-4">
                <Heading size="md">Updates</Heading>
                {fundraiserUpdates.length === 0 && (
                    <p>No updates yet</p>
                )}
                {isFetchingFundraiserUpdates ? (
                    <p>Loading updates...</p>
                ) : (
                    fundraiserUpdates.map((update) => (
                        <Card
                            key={update._id}
                            boxShadow="none"
                            border="1px"
                            borderColor="gray.200"
                            marginY="8px"
                        >
                            <CardBody>
                                <Box className="flex space-y-4">
                                    <Box flex="1">
                                        {!(
                                            new Date().getDate() -
                                            new Date(
                                                update.createdAt
                                            ).getDate()
                                        ) >= 1 && (
                                            <Badge colorScheme="green">
                                                new
                                            </Badge>
                                        )}
                                        <Markup
                                            content={
                                                update.updateDetails
                                            }
                                        />
                                        <p className="text-sm text-gray-500">
                                            {new Date(
                                                update.createdAt
                                            ).toLocaleString()}
                                        </p>
                                    </Box>
                                    <Button
                                        onClick={() =>
                                            handleDeleteUpdate(
                                                update._id
                                            )
                                        }
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </CardBody>
                        </Card>
                    ))
                )}
            </Box>
        </Stack>
    );
};

export default ManageFundraiserUpdates;
