import {
    Badge,
    Box,
    Card,
    CardBody,
    Heading,
} from '@chakra-ui/react';
import { Markup } from 'interweave';

const FundraiserUpdatesSection = ({
    fundraiserUpdates,
    isFetchingFundraiserUpdates,
}) => {
    return (
        <Card className="col-span-2">
            <CardBody className="w-full space-y-4">
                <Heading size="md">Updates</Heading>
                <Box className="w-full space-y-4">
                    {fundraiserUpdates.length === 0 && (
                        <p>No updates yet</p>
                    )}
                    {isFetchingFundraiserUpdates ? (
                        <p>Loading updates...</p>
                    ) : (
                        fundraiserUpdates.map((update) => (
                            <Card
                                key={update._id}
                                boxShadow="none"
                                border="1px"
                                borderColor="gray.200"
                                marginY="8px"
                            >
                                <CardBody>
                                    <Box className="flex space-y-4">
                                        <Box flex="1">
                                            {new Date().getDate() -
                                                new Date(
                                                    update.createdAt
                                                ).getDate() <=
                                                1 && (
                                                <Badge colorScheme="green">
                                                    new
                                                </Badge>
                                            )}
                                            <Markup
                                                content={
                                                    update.updateDetails
                                                }
                                            />
                                            <p className="text-sm text-gray-500">
                                                {new Date(
                                                    update.createdAt
                                                ).toLocaleString()}
                                            </p>
                                        </Box>
                                    </Box>
                                </CardBody>
                            </Card>
                        ))
                    )}
                </Box>
            </CardBody>
        </Card>
    );
};

export default FundraiserUpdatesSection;