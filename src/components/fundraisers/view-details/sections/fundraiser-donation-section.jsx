import { Box, Button, Card, CardBody, Progress, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { ArrowUpRightFromSquare } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { timeSince } from '../../../../lib/utils';
import DonationsCard from '../../../cards/donations-card';
import ShareFundraiserModal from '../../../modals/share-fundraiser-modal';

const FundraiserDonationSection = ({ fundraiser, isFetchingFundraiser, fundraiserDonations }) => {
  const { onClose, isOpen, onOpen } = useDisclosure();
  if (isFetchingFundraiser) return;

  return (
    <Box>
      <Card shadow="md" className="col-span-2 h-auto lg:col-span-1">
        <CardBody>
          <Stack height="100%">
            <Stack direction="row" alignItems="baseline">
              <Text size="md" fontSize="32px">
                ₹{fundraiser.amountRaised.toLocaleString('en-IN').toString()}
              </Text>
              <Text fontSize="16px" color="gray.600">
                INR raised out of {fundraiser.fundraiserGoal.toLocaleString('en-IN').toString()} goal
              </Text>
            </Stack>
            <Progress
              value={(fundraiser.amountRaised / fundraiser.fundraiserGoal) * 100}
              size="xs"
              colorScheme="teal"
            />
            <Text color="gray.600">{fundraiserDonations.length} donations</Text>
            <Stack>
              <NavLink to={`/fundraiser/${fundraiser._id}/donate`} className="w-full">
                <Button variant="solid" colorScheme="teal" className="fundraiser-card-donate-button w-full">
                  Donate now
                </Button>
              </NavLink>
              <Button
                variant="outline"
                colorScheme="teal"
                className="
                        fundraiser-card-share-button
                         items-center"
                onClick={onOpen}
                leftIcon={<ArrowUpRightFromSquare className="h-5 w-5" />}
              >
                Share
              </Button>
              <Text fontWeight="semibold" fontSize="20px">
                Donations
              </Text>

              <Stack gap="18px">
                <Box className="space-y-4 overflow-y-auto">
                  {fundraiserDonations
                    .sort((a, b) => b.donationAmount - a.donationAmount)
                    .slice(0, 5)
                    .map((donation) => (
                      <DonationsCard
                        key={donation._id}
                        name={donation.fullname}
                        amount={donation.donationAmount}
                        anonymous={donation.anonymousDonation}
                        donatedAt={timeSince(new Date(donation.createdAt))}
                      />
                    ))}
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </CardBody>
      </Card>
      <ShareFundraiserModal
        fundraiserId={fundraiser._id}
        fundraiserCreatorName={fundraiser.creatorName}
        fundraiserTitle={fundraiser.fundraiserTitle}
        onClose={onClose}
        isOpen={isOpen}
      />
    </Box>
  );
};

export default FundraiserDonationSection;
