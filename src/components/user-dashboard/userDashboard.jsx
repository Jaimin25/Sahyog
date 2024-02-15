import { useState } from 'react';

import UserBankDetails from './dashboard-sections/user-bank-details';
import UserDonations from './dashboard-sections/user-donations';
import UserFundraisers from './dashboard-sections/user-foundraisers';
import UserPersonalDetails from './dashboard-sections/user-personal-details';
import DashboardSidebar from './dashboard-siderbar';

const UserDashboardComponent = () => {
    const [currentActive, setCurrentActive] =
        useState('account');

    return (
        <div className="user-dashboard-container flex h-full gap-4 bg-teal-500 p-8">
            <DashboardSidebar
                setCurrentActive={setCurrentActive}
                currentActive={currentActive}
            />
            {
                {
                    account: <UserPersonalDetails />,
                    bankdetails: <UserBankDetails />,
                    fundraisers: <UserFundraisers />,
                    donations: <UserDonations />,
                }[currentActive]
            }
        </div>
    );
};

export default UserDashboardComponent;
