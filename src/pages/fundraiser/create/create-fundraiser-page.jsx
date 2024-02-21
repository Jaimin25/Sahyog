import axios from 'axios';
import { useEffect, useState } from 'react';

import CreateFundraiserComponent from '../../../components/fundraisers/create/create-fundraiser-card';
import { useSession } from '../../../components/providers/session-provider';
import { baseapiurl } from '../../../lib/utils';

const CreateFundraiserPage = () => {
    const { user, accessToken } = useSession();
    const [draftFundraiser, setDraftFundraiser] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!user) return;
        setLoading(true);
        const getDraftFundraiser = async () => {
            const res = await axios.post(
                `${baseapiurl}/api/user/getDraftFundraiser`,
                {
                    uid: user.id,
                    access_token: accessToken,
                }
            );
            const resData = res.data;

            if (resData.statusCode === 200) {
                setDraftFundraiser(resData.fundraiser);
                setLoading(false);
            } else {
                setLoading(false);
            }
            setLoading(false);
        };
        getDraftFundraiser();
    }, []);
    return (
        <div className="h-full space-y-4 bg-black/5 px-4 py-8 sm:px-10 md:px-14">
            <CreateFundraiserComponent
                draftFundraiser={draftFundraiser}
                setDraftFundraiser={setDraftFundraiser}
                isFetching={loading}
            />
        </div>
    );
};

export default CreateFundraiserPage;