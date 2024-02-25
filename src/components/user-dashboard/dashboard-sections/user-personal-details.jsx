import {
    Alert,
    AlertIcon,
    Badge,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Editable,
    EditableInput,
    EditablePreview,
    Heading,
    Stack,
    Text,
    useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { ImagePlus } from 'lucide-react';
import { useState } from 'react';

import { supabase } from '../../../lib/supabase';
import { baseapiurl } from '../../../lib/utils';
import { useSession } from '../../providers/session-provider';

const UserPersonalDetails = () => {
    const { user, accessToken } = useSession();
    const toast = useToast();

    const [loading, setLoading] = useState(false);
    const [isSendingMail, setIsSendingMail] = useState(false);

    const handleResendButton = async () => {
        setIsSendingMail(true);
        try {
            const res = await axios.post(
                `${baseapiurl}/api/auth/resendVerificationMail`,
                {
                    uid: user.id,
                    access_token: accessToken,
                    email: user.email,
                }
            );

            const resData = res.data;
            setIsSendingMail(false);
            if (resData.statusCode === 200) {
                toast({
                    title: 'Verification mail sent',
                    description: 'Please check your email',
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

    return (
        <Card className="flex-1" padding="10px">
            <CardHeader>
                {!user.emailVerified && (
                    <Alert>
                        <AlertIcon />
                        Please verify your email in order to
                        create a fundraiser or to donate
                    </Alert>
                )}
                <Heading>Personal Details</Heading>
            </CardHeader>
            <CardBody>
                <Stack>
                    <Text fontWeight="semibold">
                        Profile Photo
                    </Text>
                    <div>
                        <Button
                            height="142px"
                            width="142px"
                            rounded="full"
                            variant="outline"
                        >
                            <p className="flex flex-col items-center gap-2">
                                <ImagePlus />
                                Add Photo
                            </p>
                        </Button>
                    </div>
                    <Text fontWeight="semibold">Full Name</Text>
                    <Editable defaultValue={user.fullname}>
                        <EditablePreview />
                        <EditableInput />
                    </Editable>
                    <Text fontWeight="semibold" className="">
                        Email{' '}
                        {!user.emailVerified && (
                            <Badge color="red">unverified</Badge>
                        )}
                    </Text>
                    <Box className="flex items-center">
                        <Editable
                            defaultValue={user.email}
                            flex="1"
                        >
                            <EditablePreview />
                            <EditableInput
                            // onChange={(e) => {
                            //     if (!e.target.value.trim()) {
                            //         setDisabled(true);
                            //         return setEmail(user.email);
                            //     }
                            //     setEmail(e.target.value);
                            //     if (
                            //         e.target.value !== user.email
                            //     ) {
                            //         setDisabled(false);
                            //     } else {
                            //         setDisabled(true);
                            //     }
                            // }}
                            />
                        </Editable>
                        {!user.emailVerified && (
                            <Button
                                colorScheme="teal"
                                variant="link"
                                onClick={handleResendButton}
                                isLoading={isSendingMail}
                            >
                                Resend
                            </Button>
                        )}
                    </Box>
                </Stack>
            </CardBody>
            <CardFooter gap="10px">
                <Button colorScheme="teal">Save</Button>
                <Button
                    variant="solid"
                    colorScheme="red"
                    onClick={async () => {
                        setLoading(true);
                        const { error } =
                            await supabase.auth.signOut();
                        if (!error) {
                            setLoading(false);
                        }
                    }}
                    isLoading={loading}
                >
                    Logout
                </Button>
            </CardFooter>
        </Card>
    );
};

export default UserPersonalDetails;
