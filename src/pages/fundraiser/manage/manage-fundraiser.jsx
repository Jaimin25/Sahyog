import {
    Alert,
    AlertIcon,
    Card,
    CardBody,
    CardHeader,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ManageFundraiserDashboard from '../../../components/fundraisers/manage/manage-fundraiser-dashboard';
import ManageFundraiserDonation from '../../../components/fundraisers/manage/manage-fundraiser-donation';
import ManageFundraiserFundTransfers from '../../../components/fundraisers/manage/manage-fundraiser-fund-transfers';
import ManageFundraiserUpdates from '../../../components/fundraisers/manage/manage-fundraiser-updates';
import { useSession } from '../../../components/providers/session-provider';
import { baseapiurl } from '../../../lib/utils';

const ManageFundriaserPage = () => {
    const { id } = useParams();
    const toast = useToast();
    const { accessToken, user } = useSession();
    const [error, setError] = useState();

    const [isFetching, setIsFetching] = useState(true);

    const [fundraiserDetails, setFundraiserDetails] = useState(
        {}
    );
    const [fundraiserUpdates, setFundraiserUpdates] = useState(
        []
    );
    const [fundraiserDonations, setFundraiserDonations] =
        useState([]);
    const [userOtherDetails, setUserOtherDetails] = useState({});
    const [fundraiserFunds, setFundraiserFunds] = useState({});

    const fetchFundraiserDetails = async () => {
        try {
            const res = await axios.post(
                `${baseapiurl}/api/user/getUserFundraiserById`,
                {
                    uid: user.id,
                    access_token: accessToken,
                    fundraiserId: id,
                }
            );
            const resData = res.data;
            setIsFetching(false);

            if (resData.statusCode === 200) {
                setFundraiserDetails(resData.fundraiserDetails);
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
            setIsFetching(false);
            toast({
                title: 'Error',
                description: e.message,
                status: 'error',
                position: 'top-right',
                duration: 1000,
            });
        }
    };

    const fetchFundraiserUpdates = async () => {
        try {
            const res = await axios.post(
                `${baseapiurl}/api/fundraiser/getFundraiserUpdates`,
                {
                    fundraiserId: id,
                }
            );

            const resData = res.data;

            if (resData.statusCode === 200) {
                setFundraiserUpdates(resData.fundraiserUpdates);
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
            setIsFetching(false);
            toast({
                title: 'Error',
                description: e.message,
                status: 'error',
                position: 'top-right',
                duration: 1000,
            });
        }
    };

    const fetchFundraiserDonations = async () => {
        try {
            const res = await axios.post(
                `${baseapiurl}/api/donation/getFundraiserDonationsById`,
                {
                    fundraiserId: id,
                }
            );

            const resData = res.data;

            if (resData.statusCode === 200) {
                setFundraiserDonations(resData.donations);
            } else {
                setError(resData.message);
            }
        } catch (e) {
            setIsFetching(false);
        }
    };

    const fetchUserOtherDetails = async () => {
        try {
            const res = await axios.post(
                `${baseapiurl}/api/user/getUserOtherDetails`,
                {
                    uid: user.id,
                    access_token: accessToken,
                }
            );

            const resData = res.data;

            if (resData.statusCode === 200) {
                setUserOtherDetails(resData.otherDetails);
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

    const fetchFundraiserFunds = async () => {
        try {
            const res = await axios.post(
                `${baseapiurl}/api/fundraiser/getFundraiserFunds`,
                {
                    uid: user.id,
                    access_token: accessToken,
                    fundraiserId: id,
                }
            );

            const resData = res.data;

            if (resData.statusCode === 200) {
                setFundraiserFunds(resData.fundraiserFunds);
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

    useEffect(() => {
        setIsFetching(true);

        fetchUserOtherDetails();
        fetchFundraiserFunds();
        fetchFundraiserDonations();
        fetchFundraiserUpdates();
        fetchFundraiserDetails();
    }, []);

    if (!isFetching && fundraiserDetails.status !== 'active') {
        return (
            <div className="h-full space-y-4 bg-black/5 px-4 py-8 sm:px-10 md:px-14">
                <Card>
                    <CardBody>
                        {error && (
                            <Alert status="error">
                                <AlertIcon />
                                {error}
                            </Alert>
                        )}
                    </CardBody>
                </Card>
            </div>
        );
    }

    return (
        <div className="h-full space-y-4 bg-black/5 px-4 py-8 sm:px-10 md:px-14">
            <Card boxShadow="md">
                <Tabs colorScheme="teal">
                    <CardHeader>
                        <TabList>
                            <Tab>Dashboard</Tab>
                            <Tab>Updates</Tab>
                            <Tab>Donations</Tab>
                            <Tab>Transfers</Tab>
                        </TabList>
                    </CardHeader>
                    <CardBody>
                        <TabPanels>
                            <TabPanel>
                                <ManageFundraiserDashboard
                                    fundraiser={
                                        fundraiserDetails
                                    }
                                    isFetching={isFetching}
                                    setFundraiser={
                                        setFundraiserDetails
                                    }
                                />
                            </TabPanel>
                            <TabPanel>
                                <ManageFundraiserUpdates
                                    fundraiser={
                                        fundraiserDetails
                                    }
                                    fundraiserUpdates={
                                        fundraiserUpdates
                                    }
                                    setFundraiserUpdates={
                                        setFundraiserUpdates
                                    }
                                    isFetching={isFetching}
                                />
                            </TabPanel>
                            <TabPanel>
                                <ManageFundraiserDonation
                                    fundraiser={
                                        fundraiserDetails
                                    }
                                    fundraiserDonations={
                                        fundraiserDonations
                                    }
                                    isFetching={isFetching}
                                />
                            </TabPanel>
                            <TabPanel>
                                <ManageFundraiserFundTransfers
                                    userOtherDetails={
                                        userOtherDetails
                                    }
                                    fundraiserFunds={
                                        fundraiserFunds
                                    }
                                    isFetching={isFetching}
                                />
                            </TabPanel>
                        </TabPanels>
                    </CardBody>
                </Tabs>
            </Card>
        </div>
    );
};

export default ManageFundriaserPage;
