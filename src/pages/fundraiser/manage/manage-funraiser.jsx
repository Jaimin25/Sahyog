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
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ManageFundraiserDashboard from '../../../components/fundraisers/manage/manage-fundraiser-dashboard';
import { useSession } from '../../../components/providers/session-provider';
import { baseapiurl } from '../../../lib/utils';

const ManageFundriaserPage = () => {
    const { id } = useParams();
    const { accessToken, user } = useSession();

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
                setIsFetchingFundraiser(false);
            } else {
                setIsFetchingFundraiser(false);
            }
            setIsFetchingFundraiser(false);
        } catch (e) {
            // console.log(e);
        }
    };

    useEffect(() => {
        setIsFetchingFundraiser(true);
        fetchFundraiserDetails();
    }, []);

    if (fundraiserDetails.status !== 'active') {
        return (
            <div className="h-full space-y-4 bg-black/5 px-4 py-8 sm:px-10 md:px-14">
                <Card>
                    <CardBody>
                        <Alert status="info">
                            <AlertIcon />
                            The fundraiser you are trying to
                            access is either deleted or not
                            published
                        </Alert>
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
                                />
                            </TabPanel>
                            <TabPanel>
                                <p>two!</p>
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
