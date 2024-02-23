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
import ManageFundraiserUpdates from '../../../components/fundraisers/manage/manage-fundraiser-updates';
import { useSession } from '../../../components/providers/session-provider';
import { baseapiurl } from '../../../lib/utils';

const ManageFundriaserPage = () => {
    const { id } = useParams();
    const toast = useToast();
    const { accessToken, user } = useSession();
    const [error, setError] = useState();

    const [isFetchingFundraiser, setIsFetchingFundraiser] =
        useState(true);
    const [
        isFetchingFundraiserUpdates,
        setIsFetchingFundraiserUpdates,
    ] = useState(true);
    const [
        isFetchingFundraiserDonations,
        setIsFetchingFundraiserDonations,
    ] = useState(true);

    const [fundraiserDetails, setFundraiserDetails] = useState(
        {}
    );

    const [fundraiserUpdates, setFundraiserUpdates] = useState(
        []
    );

    const [fundraiserDonations, setFundraiserDonations] =
        useState([]);

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

            if (resData.statusCode === 200) {
                setFundraiserDetails(resData.fundraiserDetails);
            } else {
                setError(resData.message);
            }
            setIsFetchingFundraiser(false);
        } catch (e) {
            setIsFetchingFundraiser(false);

            toast({
                title: 'Error',
                description: e.message,
                status: 'error',
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
                setError(resData.message);
                setIsFetchingFundraiserUpdates(false);
            }
            setIsFetchingFundraiserUpdates(false);
        } catch (e) {
            toast({
                title: 'Error',
                description: e.message,
                status: 'error',
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
            console.log(resData);
            setIsFetchingFundraiserDonations(false);
        } catch (e) {
            toast({
                title: 'Error',
                description: e.message,
                status: 'error',
                duration: 1000,
            });
            setIsFetchingFundraiserDonations(false);
        }
    };

    useEffect(() => {
        setIsFetchingFundraiser(true);
        setIsFetchingFundraiserUpdates(true);
        setIsFetchingFundraiserDonations(true);
        fetchFundraiserDetails();
        fetchFundraiserUpdates();
        fetchFundraiserDonations();
    }, []);

    if (
        !isFetchingFundraiser &&
        fundraiserDetails.status !== 'active'
    ) {
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
                        </TabList>
                    </CardHeader>
                    <CardBody>
                        <TabPanels>
                            <TabPanel>
                                <ManageFundraiserDashboard
                                    fundraiser={
                                        fundraiserDetails
                                    }
                                    isFetchingFundraiser={
                                        isFetchingFundraiser
                                    }
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
                                    isFetchingFundraiserUpdates={
                                        isFetchingFundraiserUpdates
                                    }
                                />
                            </TabPanel>
                            <TabPanel>
                                <p>three!</p>
                            </TabPanel>
                        </TabPanels>
                    </CardBody>
                </Tabs>
            </Card>
        </div>
    );
};

export default ManageFundriaserPage;
