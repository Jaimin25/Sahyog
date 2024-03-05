import { Alert, AlertIcon, Box, Button, Stack, Text } from '@chakra-ui/react';

const ManageFundraiserFundTransfers = ({ userOtherDetails, fundraiserFunds, isFetching }) => {
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
          Please verify your identity and add your bank details before collecting funds.
          <br /> Go to Dashboard &gt; Other Details, fill out the form, and submit to start the review process of your
          details.
        </Alert>
      </Stack>
    );
  }

  return (
    <Stack spacing="10px">
      {userOtherDetails && userOtherDetails.status === 'review' && (
        <Alert>
          <AlertIcon />
          Your details are under review
        </Alert>
      )}
      <Text className="text-lg">
        Total Fund:{' '}
        <span className="font-semibold">
          ₹{fundraiserFunds && fundraiserFunds.funds.toLocaleString('en-In').toString()}
        </span>
      </Text>
      <Box>
        <Button colorScheme="teal" isDisabled={userOtherDetails && userOtherDetails.status === 'review'}>
          Transfer
        </Button>
      </Box>
    </Stack>
  );
};

export default ManageFundraiserFundTransfers;
