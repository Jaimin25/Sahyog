import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import FundraiserDetails from '../../../components/fundraisers/view-details/fundraiser-details';
import { baseapiurl } from '../../../lib/utils';

const FundraiserPage = () => {
    const { id } = useParams();

    const toast = useToast();

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

    const fetchFundraiserDetails = async () => {
        try {
            const res = await axios.post(
                `${baseapiurl}/api/fundraiser/getFundraiserById`,
                {
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
                    duration: 1000,
                });
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

    useEffect(() => {
        setIsFetchingFundraiser(true);
        setFundraiserUpdates(true);
        fetchFundraiserDetails();
        fetchFundraiserUpdates();
    }, []);

    return (
        <div className="space-y-4 bg-black/5 px-4 py-8 sm:px-10 md:px-14">
            <FundraiserDetails
                fundraiser={fundraiserDetails}
                isFetchingFundraiser={isFetchingFundraiser}
                isFetchingFundraiserUpdates={
                    isFetchingFundraiserUpdates
                }
                fundraiserUpdates={fundraiserUpdates}
            />
        </div>
    );
};

export default FundraiserPage;
