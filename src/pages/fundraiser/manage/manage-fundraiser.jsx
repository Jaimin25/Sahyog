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

  const [isFetchingFundraiser, setIsFetchingFundraiser] = useState(true);
  const [isFetchingUpdates, setIsFetchingUpdates] = useState(true);
  const [isFetchingDonations, setIsFetchingDonations] = useState(true);
  const [isFetchingFunds, setIsFetchingFunds] = useState(true);
  const [isFetchingOtherDetails, setIsFetchingOtherDetails] = useState(true);

  const [fundraiserDetails, setFundraiserDetails] = useState({});
  const [fundraiserUpdates, setFundraiserUpdates] = useState([]);
  const [fundraiserDonations, setFundraiserDonations] = useState([]);
  const [userOtherDetails, setUserOtherDetails] = useState({});
  const [fundraiserFunds, setFundraiserFunds] = useState({});

  const fetchFundraiserUpdates = async () => {
    setIsFetchingUpdates(true);
    try {
      const res = await axios.post(`${baseapiurl}/api/fundraiser/getFundraiserUpdates`, {
        fundraiserId: id,
      });

      const resData = res.data;
      setIsFetchingUpdates(false);

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
      setIsFetchingUpdates(false);
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
    setIsFetchingDonations(true);
    try {
      const res = await axios.post(`${baseapiurl}/api/donation/getFundraiserDonationsById`, {
        fundraiserId: id,
      });

      const resData = res.data;
      setIsFetchingDonations(false);

      if (resData.statusCode === 200) {
        setFundraiserDonations(resData.donations);
      } else {
        setError(resData.message);
      }
    } catch (e) {
      setIsFetchingDonations(false);
    }
  };

  const fetchUserOtherDetails = async () => {
    setIsFetchingOtherDetails(true);
    try {
      const res = await axios.post(`${baseapiurl}/api/user/getUserOtherDetails`, {
        uid: user.id,
        access_token: accessToken,
      });

      const resData = res.data;
      setIsFetchingOtherDetails(false);

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
      setIsFetchingOtherDetails(false);
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
    setIsFetchingFunds(true);
    try {
      const res = await axios.post(`${baseapiurl}/api/fundraiser/getFundraiserFunds`, {
        uid: user.id,
        access_token: accessToken,
        fundraiserId: id,
      });

      const resData = res.data;
      setIsFetchingFunds(false);

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
      setIsFetchingFunds(false);
      toast({
        title: 'Error',
        description: e.message,
        status: 'error',
        position: 'top-right',
        duration: 1000,
      });
    }
  };

  const fetchFundraiserDetails = async () => {
    setIsFetchingFundraiser(true);
    try {
      const res = await axios.post(`${baseapiurl}/api/user/getUserFundraiserById`, {
        uid: user.id,
        access_token: accessToken,
        fundraiserId: id,
      });
      const resData = res.data;
      setIsFetchingFundraiser(false);

      if (resData.statusCode === 200) {
        setFundraiserDetails(resData.fundraiserDetails);
        if (resData.fundraiserDetails.status === 'active') {
          fetchFundraiserDonations();
          fetchFundraiserUpdates();
          fetchFundraiserFunds();
          fetchUserOtherDetails();
        }
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
      setIsFetchingFundraiser(false);
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
    fetchFundraiserDetails();
  }, []);

  if (!isFetchingFundraiser && fundraiserDetails.status !== 'active') {
    return (
      <div className="h-full space-y-4 bg-black/5 px-4 py-8 sm:px-10 lg:px-14">
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
    <div className="h-full space-y-4 bg-black/5 px-4 py-8 sm:px-10 lg:px-14">
      <Card shadow="md">
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
                  fundraiser={fundraiserDetails}
                  isFetching={isFetchingFundraiser}
                  setFundraiser={setFundraiserDetails}
                />
              </TabPanel>
              <TabPanel>
                <ManageFundraiserUpdates
                  fundraiser={fundraiserDetails}
                  fundraiserUpdates={fundraiserUpdates}
                  setFundraiserUpdates={setFundraiserUpdates}
                  isFetching={isFetchingUpdates}
                />
              </TabPanel>
              <TabPanel>
                <ManageFundraiserDonation
                  fundraiser={fundraiserDetails}
                  fundraiserDonations={fundraiserDonations}
                  isFetching={isFetchingDonations}
                />
              </TabPanel>
              <TabPanel>
                <ManageFundraiserFundTransfers
                  userOtherDetails={userOtherDetails}
                  fundraiserFunds={fundraiserFunds}
                  isFetching={isFetchingFunds || isFetchingOtherDetails}
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
