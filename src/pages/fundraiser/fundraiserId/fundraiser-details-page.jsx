import { Alert, AlertIcon, Card, CardBody, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import FundraiserDetails from '../../../components/fundraisers/view-details/fundraiser-details';
import { baseapiurl } from '../../../lib/utils';

const FundraiserPage = () => {
  const { id } = useParams();

  const toast = useToast();

  const [isFetchingFundraiser, setIsFetchingFundraiser] = useState(true);
  const [isFetchingFundraiserUpdates, setIsFetchingFundraiserUpdates] = useState(true);
  const [isFetchingFundraiserDonations, setIsFetchingFundraiserDonations] = useState(true);
  const [error, setError] = useState();

  const [fundraiserDetails, setFundraiserDetails] = useState({});

  const [fundraiserUpdates, setFundraiserUpdates] = useState([]);

  const [fundraiserDonations, setFundraiserDonations] = useState([]);

  const fetchFundraiserDetails = async () => {
    try {
      const res = await axios.post(`${baseapiurl}/api/fundraiser/getFundraiserById`, {
        fundraiserId: id,
      });
      const resData = res.data;
      setIsFetchingFundraiser(false);
      if (resData.statusCode === 200) {
        setFundraiserDetails(resData.fundraiserDetails);
      } else {
        toast({
          title: 'Error',
          description: resData.message,
          status: 'error',
          position: 'top-right',
          duration: 1000,
        });
        setError(resData.message);
      }
    } catch (e) {
      setIsFetchingFundraiser(false);
      // console.log(e);
    }
  };

  const fetchFundraiserUpdates = async () => {
    try {
      const res = await axios.post(`${baseapiurl}/api/fundraiser/getFundraiserUpdates`, {
        fundraiserId: id,
      });

      const resData = res.data;

      if (resData.statusCode === 200) {
        setFundraiserUpdates(resData.fundraiserUpdates);
      } else {
        setError(resData.message);
      }
      setIsFetchingFundraiserUpdates(false);
    } catch (e) {
      setIsFetchingFundraiserUpdates(false);
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
      const res = await axios.post(`${baseapiurl}/api/donation/getFundraiserDonationsById`, {
        fundraiserId: id,
      });

      const resData = res.data;
      setIsFetchingFundraiserDonations(false);
      if (resData.statusCode === 200) {
        setFundraiserDonations(resData.donations);
      } else {
        setError(resData.message);
      }
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
    setFundraiserUpdates(true);
    setIsFetchingFundraiserDonations(true);
    fetchFundraiserDetails();
    fetchFundraiserUpdates();
    fetchFundraiserDonations();
  }, []);

  if (!isFetchingFundraiser && fundraiserDetails.status !== 'active' && error) {
    return (
      <div className="space-y-4 bg-black/5 px-4 py-8 sm:px-10 lg:px-14">
        <Card>
          <CardBody>
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 bg-black/5 px-4 py-8 sm:px-10 lg:px-14">
      <FundraiserDetails
        fundraiser={fundraiserDetails}
        isFetchingFundraiser={isFetchingFundraiser || isFetchingFundraiserUpdates || isFetchingFundraiserDonations}
        isFetchingFundraiserUpdates={isFetchingFundraiserUpdates}
        fundraiserUpdates={fundraiserUpdates}
        isFetchingFundraiserDonations={isFetchingFundraiserDonations}
        fundraiserDonations={fundraiserDonations}
      />
    </div>
  );
};

export default FundraiserPage;
