import { Progress, Stack, Text } from '@chakra-ui/react';

import { timeSince } from '../../../lib/utils';
import DonationsCard from '../../cards/donations-card';
import ManageFundraiserDonationSkeleton from '../../skeletons/manage-fundraiser-donations-skeleton';

const ManageFundraiserDonation = ({ fundraiser, isFetching, fundraiserDonations }) => {
  if (isFetching) {
    return <ManageFundraiserDonationSkeleton />;
  }

  return (
    <Stack height="100%">
      <Stack direction="row" alignItems="baseline">
        <Text size="md" fontSize="32px">
          ₹{fundraiser.amountRaised.toLocaleString('en-IN').toString()}
        </Text>
        <Text fontSize="16px" color="gray.600">
          INR raised out of {fundraiser.fundraiserGoal.toLocaleString('en-IN').toString()} goal
        </Text>
      </Stack>
      <Progress value={(fundraiser.amountRaised / fundraiser.fundraiserGoal) * 100} size="xs" colorScheme="teal" />
      <Text color="gray.600">{fundraiserDonations.length} donations</Text>
      <Stack>
        <Text fontWeight="semibold" fontSize="20px">
          Donations
        </Text>
        <Stack gap="18px">
          {fundraiserDonations
            .sort((a, b) => b.donationAmount - a.donationAmount)
            .map((donation) => (
              <DonationsCard
                key={donation._id}
                name={donation.fullname}
                amount={donation.donationAmount}
                anonymous={donation.anonymousDonation}
                donatedAt={timeSince(new Date(donation.createdAt))}
              />
            ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ManageFundraiserDonation;
