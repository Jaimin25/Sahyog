import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Heading,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';

const UserDonations = ({ donations }) => {
    return (
        <Card className="flex-1" padding="10px">
            <CardHeader>
                <Heading>Donations</Heading>
            </CardHeader>
            <CardBody>
                {/* <Text>
                    Your donations will be displayed here in
                    table form
                </Text> */}
                <TableContainer>
                    <Table variant="simple" size="sm">
                        <Thead>
                            <Tr>
                                <Th>Donated To</Th>
                                <Th>Transaction Id</Th>
                                <Th>Amount</Th>
                                <Th>Details</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {donations.map((donation) => (
                                <Tr key={donation._id}>
                                    <Td>
                                        <Button
                                            variant="link"
                                            colorScheme="teal"
                                        >
                                            {
                                                donation.fundraiserTitle
                                            }
                                        </Button>
                                    </Td>
                                    <Td>{donation.paymentId}</Td>
                                    <Td>
                                        ₹
                                        {donation.donationAmount}
                                    </Td>
                                    <Td>
                                        <Button colorScheme="teal">
                                            View
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </CardBody>
        </Card>
    );
};

export default UserDonations;
