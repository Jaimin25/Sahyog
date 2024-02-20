import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import FundraiserDetails from '../../../components/fundraisers/view-details/fundraiser-details';
import { useSession } from '../../../components/providers/session-provider';
import { baseapiurl } from '../../../lib/utils';

const FundraiserPage = () => {
    const { id } = useParams();
    const { user } = useSession();

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
    useEffect(() => {
        setIsFetchingFundraiser(true);
        fetchFundraiserDetails();
    }, []);
    return (
        <div className="space-y-4 bg-teal-500 px-4 py-8 sm:px-10 md:px-14">
            <FundraiserDetails
                fundraiser={fundraiserDetails}
                isFetchingFundraiser={isFetchingFundraiser}
            />
        </div>
    );
};

export default FundraiserPage;
