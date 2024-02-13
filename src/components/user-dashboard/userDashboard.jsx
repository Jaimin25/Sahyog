import { Button, Card, Stack } from '@chakra-ui/react';
import { useState } from 'react';

import UserBankDetails from './dashboard-sections/user-bank-details';
import UserDonations from './dashboard-sections/user-donations';
import UserFundraisers from './dashboard-sections/user-foundraisers';
import UserPersonalDetails from './dashboard-sections/user-personal-details';

const UserDashboardComponent = () => {
    const [currentActive, setCurrentActive] =
        useState('account');

    const changeCurrentActive = (active) => {
        setCurrentActive(active);
    };

    return (
        <div className="user-dashboard-container flex h-full gap-4 p-8">
            <Card className="h-full w-1/6" padding="10px">
                <Stack padding="10px">
                    <Button
                        onClick={() =>
                            changeCurrentActive('account')
                        }
                        variant="ghost"
                        border="1px"
                        borderColor="teal"
                        _hover={{
                            background: 'teal.100',
                        }}
                        color="teal"
                        className={
                            currentActive === 'account' &&
                            'bg-teal-100'
                        }
                    >
                        Account
                    </Button>
                    <Button
                        onClick={() =>
                            changeCurrentActive('bankdetails')
                        }
                        variant="ghost"
                        border="1px"
                        borderColor="teal"
                        _hover={{
                            background: 'teal.100',
                        }}
                        color="teal"
                        className={
                            currentActive === 'bankdetails' &&
                            'bg-teal-100'
                        }
                    >
                        Bank Details
                    </Button>
                    <Button
                        onClick={() =>
                            changeCurrentActive('fundraisers')
                        }
                        variant="ghost"
                        border="1px"
                        borderColor="teal"
                        _hover={{
                            background: 'teal.100',
                        }}
                        color="teal"
                        className={
                            currentActive === 'fundraisers' &&
                            'bg-teal-100'
                        }
                    >
                        Fundraisers
                    </Button>
                    <Button
                        onClick={() =>
                            changeCurrentActive('donations')
                        }
                        variant="ghost"
                        border="1px"
                        borderColor="teal"
                        _hover={{
                            background: 'teal.100',
                        }}
                        color="teal"
                        className={
                            currentActive === 'donations' &&
                            'bg-teal-100'
                        }
                    >
                        Donations
                    </Button>
                </Stack>
            </Card>
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
