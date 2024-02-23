import {
    Button,
    Card,
    CardBody,
    Progress,
    Stack,
    Text,
} from '@chakra-ui/react';
import { ArrowUpRightFromSquare } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import DonationsCard from '../../../cards/donations-card';

const FundraiserDonationSection = ({
    fundraiser,
    isFetchingFundraiser,
}) => {
    if (isFetchingFundraiser) return;

    return (
        <Card shadow="md" className="h-screen">
            <CardBody>
                <Stack height="100%">
                    <Stack direction="row" alignItems="baseline">
                        <Text size="md" fontSize="32px">
                            ₹
                            {145 +
                                fundraiser.amountRaised
                                    .toLocaleString('en-IN')
                                    .toString()}
                        </Text>
                        <Text fontSize="16px" color="gray.600">
                            INR raised out of{' '}
                            {fundraiser.fundraiserGoal
                                .toLocaleString('en-IN')
                                .toString()}{' '}
                            goal
                        </Text>
                    </Stack>
                    <Progress
                        value={
                            ((fundraiser.amountRaised + 1450) /
                                fundraiser.fundraiserGoal) *
                            100
                        }
                        size="xs"
                        colorScheme="teal"
                    />
                    <Text color="gray.600">0 donations</Text>
                    <Stack>
                        <NavLink
                            to={`/fundraiser/${fundraiser._id}/donate`}
                            className="w-full"
                        >
                            <Button
                                variant="solid"
                                colorScheme="teal"
                                className="fundraiser-card-donate-button w-full"
                            >
                                Donate now
                            </Button>
                        </NavLink>
                        <Button
                            variant="outline"
                            colorScheme="teal"
                            className="
                        fundraiser-card-share-button
                         items-center gap-2"
                        >
                            <ArrowUpRightFromSquare className="h-5 w-5" />
                            Share
                        </Button>
                        <Text
                            fontWeight="semibold"
                            fontSize="20px"
                        >
                            Donations
                        </Text>
                        <Stack gap="18px">
                            <DonationsCard
                                name="abc"
                                amount={100}
                                anonymous={false}
                                donatedAt="2 d"
                            />
                            <DonationsCard
                                name="x"
                                amount={250}
                                anonymous={false}
                                donatedAt="2 d"
                            />
                            <DonationsCard
                                name="abc sf"
                                amount={100}
                                anonymous={false}
                                donatedAt="2 d"
                            />
                            <DonationsCard
                                name="test f"
                                amount={1000}
                                anonymous={false}
                                donatedAt="2 d"
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </CardBody>
        </Card>
    );
};

export default FundraiserDonationSection;
