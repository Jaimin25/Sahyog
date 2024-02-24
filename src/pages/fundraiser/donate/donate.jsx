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
    Checkbox,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    Stack,
    Text,
    useToast,
} from '@chakra-ui/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { IndianRupee } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { NavLink, useParams } from 'react-router-dom';

import { useSession } from '../../../components/providers/session-provider';
import { baseapiurl } from '../../../lib/utils';
import CheckoutForm from './checkout-form';

const stripe = await loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);
const DonatePage = () => {
    const { id } = useParams();
    const { user } = useSession();
    const toast = useToast();
    const [isFormVisible, showForm] = useState(false);
    const [error, setError] = useState();

    const [fundraiserDetails, setFundraiserDetails] = useState();
    const [fetchingFundraiser, setIsFetchingFundraiser] =
        useState(true);

    const [donationAmount, setDonationAmount] = useState();
    const [anonymousDonation, setAnonymousDonation] =
        useState(false);

    const [isDonationSuccess, setIsDonationSuccess] =
        useState(false);

    const options = {
        mode: 'payment',
        amount: donationAmount * 100,
        currency: 'inr',
        paymentMethodCreation: 'manual',
    };

    useEffect(() => {
        const fetchFundraiserDetails = async () => {
            try {
                const res = await axios.post(
                    `${baseapiurl}/api/fundraiser/getFundraiserById`,
                    {
                        fundraiserId: id,
                    }
                );
                const resData = res.data;
                setIsFetchingFundraiser(false);
                if (resData.statusCode === 200) {
                    setFundraiserDetails(
                        resData.fundraiserDetails
                    );
                } else {
                    setError(resData.message);
                    toast({
                        title: 'Error',
                        description: resData.message,
                        status: 'error',
                        position: 'top-right',
                        duration: 1000,
                    });
                }
            } catch (e) {
                setError(e.message);
                toast({
                    title: 'Error',
                    description: e.message,
                    status: 'error',
                    position: 'top-right',
                    duration: 1000,
                });
            }
        };
        setIsFetchingFundraiser(true);
        fetchFundraiserDetails();
    }, []);

    if (!fundraiserDetails && !fetchingFundraiser && error)
        return (
            <div className="flex h-full items-center justify-center space-y-4 bg-black/5 px-4 py-8 sm:px-10 md:px-14">
                <Card className="w-full">
                    <CardBody>
                        <Alert status="error">
                            <AlertIcon />
                            {error}
                        </Alert>
                    </CardBody>
                </Card>
            </div>
        );

    if (!user.emailVerified) {
        return (
            <div className="flex h-full items-center justify-center space-y-4 bg-black/5 px-4 py-8 sm:px-10 md:px-14">
                <Card className="w-full">
                    <CardBody>
                        <Alert status="error">
                            <AlertIcon />
                            Please verify your email to donate
                        </Alert>
                    </CardBody>
                </Card>
            </div>
        );
    }

    if (isDonationSuccess) {
        return (
            <div className="flex h-full items-center justify-center space-y-4 bg-black/5 px-4 py-8 sm:px-10 md:px-14">
                <Card className="flex w-full items-center sm:w-2/3 md:w-1/2">
                    <CardHeader>
                        <Heading>
                            Thank you for donating!
                        </Heading>
                    </CardHeader>
                    <CardBody>
                        <Box className="flex flex-col items-center gap-3">
                            <Box>
                                <LazyLoadImage
                                    src={
                                        fundraiserDetails.coverMediaUrl
                                    }
                                    className="aspect-video w-[250px] rounded-lg"
                                />
                            </Box>
                            <Box textAlign="center">
                                <Text fontSize="18px">
                                    <span className="font-semibold">
                                        {
                                            fundraiserDetails.fundraiserTitle
                                        }
                                    </span>
                                </Text>
                                <Text>
                                    Your donation of{' '}
                                    <span className="font-semibold">
                                        ₹{donationAmount}
                                    </span>{' '}
                                    will benefit{' '}
                                    <span className="font-semibold">
                                        {
                                            fundraiserDetails.creatorName
                                        }
                                    </span>{' '}
                                    and their fundraiser
                                </Text>
                            </Box>
                        </Box>
                    </CardBody>
                    <CardFooter>
                        <NavLink to="/fundraisers/discover">
                            <Button colorScheme="teal">
                                Keep Donating
                            </Button>
                        </NavLink>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex h-full items-center justify-center space-y-4 bg-black/5 px-4 py-8 sm:px-10 md:px-14">
            <Card className="w-full sm:w-2/3 md:w-1/2">
                <CardHeader>
                    <Badge colorScheme="red">
                        Payment happens in test mode
                    </Badge>
                    <Heading>Donate</Heading>
                </CardHeader>
                <CardBody>
                    <Stack gap="18px">
                        {fundraiserDetails && (
                            <Box className="flex gap-3">
                                <Box>
                                    <LazyLoadImage
                                        src={
                                            fundraiserDetails.coverMediaUrl
                                        }
                                        className="aspect-video w-[150px] rounded-lg"
                                    />
                                </Box>
                                <Box>
                                    <Text fontSize="18px">
                                        You&apos;re supporting{' '}
                                        <span className="font-semibold">
                                            {
                                                fundraiserDetails.fundraiserTitle
                                            }
                                        </span>
                                    </Text>
                                    <Text
                                        color="gray.500"
                                        fontSize="14px"
                                    >
                                        Your donation will
                                        benefit{' '}
                                        <span className="font-semibold">
                                            {
                                                fundraiserDetails.creatorName
                                            }
                                        </span>
                                    </Text>
                                    {isFormVisible &&
                                        donationAmount &&
                                        donationAmount >=
                                            100 && (
                                            <Text className="w-full text-center text-xl">
                                                Donating{' '}
                                                <span className="font-semibold">
                                                    ₹
                                                    {
                                                        donationAmount
                                                    }
                                                </span>
                                            </Text>
                                        )}
                                </Box>
                            </Box>
                        )}
                        {!isFormVisible && (
                            <Stack gap="14px">
                                <Text fontWeight="semibold">
                                    Amount
                                </Text>
                                <InputGroup>
                                    <Box width="100%">
                                        <Box className="flex">
                                            <InputLeftAddon>
                                                <IndianRupee className="h-5 w-5" />
                                            </InputLeftAddon>
                                            <Input
                                                type="number"
                                                value={
                                                    donationAmount
                                                }
                                                onChange={(e) =>
                                                    setDonationAmount(
                                                        e.target
                                                            .value
                                                    )
                                                }
                                            />
                                        </Box>
                                        <Text className="text-sm text-gray-500">
                                            Donation amount must
                                            be at least ₹100
                                        </Text>
                                    </Box>
                                </InputGroup>
                                <Text fontWeight="semibold">
                                    Full Name
                                </Text>

                                <Input
                                    value={user.fullname}
                                    isDisabled="true"
                                />
                                <Text fontWeight="semibold">
                                    Email
                                </Text>

                                <Input
                                    value={user.email}
                                    isDisabled="true"
                                />
                                <Box className="h-full">
                                    <Checkbox
                                        isChecked={
                                            anonymousDonation
                                        }
                                        onChange={(e) =>
                                            setAnonymousDonation(
                                                e.target.checked
                                            )
                                        }
                                    >
                                        Don&apos;t show my name
                                        publicly
                                    </Checkbox>
                                </Box>
                            </Stack>
                        )}
                        {isFormVisible && (
                            <Elements
                                stripe={stripe}
                                options={options}
                            >
                                <CheckoutForm
                                    amount={donationAmount}
                                    anonymous={anonymousDonation}
                                    fundraiserId={id}
                                    setIsDonationSuccess={
                                        setIsDonationSuccess
                                    }
                                />
                            </Elements>
                        )}
                        <Button
                            onClick={() =>
                                showForm(!isFormVisible)
                            }
                            isDisabled={
                                !donationAmount ||
                                !(donationAmount >= 100)
                            }
                            colorScheme={
                                isFormVisible ? 'red' : 'teal'
                            }
                        >
                            {isFormVisible
                                ? 'Cancel'
                                : 'Procees to pay'}
                        </Button>
                    </Stack>
                </CardBody>
            </Card>
        </div>
    );
};

export default DonatePage;
