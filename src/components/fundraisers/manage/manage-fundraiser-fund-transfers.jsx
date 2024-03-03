import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Stack,
    Text,
} from '@chakra-ui/react';

const ManageFundraiserFundTransfers = ({
    userOtherDetails,
    fundraiserFunds,
    isFetching,
}) => {
    if (isFetching) {
        return (
            <Stack>
                <Text>Loading...</Text>
            </Stack>
        );
    }

    if (!userOtherDetails) {
        return (
            <Stack>
                <Alert>
                    <AlertIcon />
                    Go to Dashboard &gt; Other Details, fill out
                    the form and submit in order to start
                    recieving funds into your bank.
                </Alert>
            </Stack>
        );
    }

    return (
        <Stack spacing="10px">
            {userOtherDetails ||
                (userOtherDetails.status === 'review' && (
                    <Alert>
                        <AlertIcon />
                        Your details are still under review
                    </Alert>
                ))}
            <Text className="text-lg">
                Collected Funds:{' '}
                <span className="font-semibold">
                    ₹
                    {fundraiserFunds &&
                        fundraiserFunds.funds.toLocaleString(
                            'en-In'
                        )}
                </span>
            </Text>
            <Box>
                <Button
                    colorScheme="teal"
                    isDisabled={
                        userOtherDetails ||
                        userOtherDetails.status === 'valid'
                    }
                >
                    Transfer
                </Button>
            </Box>
        </Stack>
    );
};

export default ManageFundraiserFundTransfers;
