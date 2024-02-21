import axios from 'axios';
import { useEffect, useState } from 'react';

import { baseapiurl } from '../../lib/utils';
import { useSession } from '../providers/session-provider';
import UserBankDetails from './dashboard-sections/user-bank-details';
import UserDonations from './dashboard-sections/user-donations';
import UserFundraisers from './dashboard-sections/user-foundraisers';
import UserPersonalDetails from './dashboard-sections/user-personal-details';
import DashboardSidebar from './dashboard-siderbar';

const UserDashboardComponent = () => {
    const [currentActive, setCurrentActive] =
        useState('account');
    const { user, accessToken } = useSession();
    const [userFundraisers, setUserFundraisers] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchUserFundraisers = async () => {
        const res = await axios.post(
            `${baseapiurl}/api/user/getAllFundraisers`,
            { uid: user.id, access_token: accessToken }
        );
        const resData = res.data;
        if (resData.statusCode === 200) {
            setUserFundraisers(resData.userFundraisers);
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchUserFundraisers();
    }, []);

    return (
        <div className="user-dashboard-container flex h-full flex-col gap-4 bg-black/5 p-8 md:flex-row">
            <div className="h-full w-full md:flex md:w-1/6">
                <DashboardSidebar
                    setCurrentActive={setCurrentActive}
                    currentActive={currentActive}
                />
            </div>
            {
                {
                    account: <UserPersonalDetails />,
                    bankdetails: <UserBankDetails />,
                    fundraisers: (
                        <UserFundraisers
                            loading={loading}
                            userFundraisers={userFundraisers}
                        />
                    ),
                    donations: <UserDonations />,
                }[currentActive]
            }
        </div>
    );
};

export default UserDashboardComponent;
