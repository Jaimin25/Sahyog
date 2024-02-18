import { Button, Card, Stack } from '@chakra-ui/react';

const DashboardSidebar = ({
    setCurrentActive,
    currentActive,
}) => {
    const changeCurrentActive = (active) => {
        setCurrentActive(active);
    };

    return (
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
    );
};

export default DashboardSidebar;
