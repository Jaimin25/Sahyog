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

const UserDonations = () => {
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
                            <Tr>
                                <Td>
                                    <Button
                                        variant="link"
                                        colorScheme="teal"
                                    >
                                        Help children with their
                                        education
                                    </Button>
                                </Td>
                                <Td>
                                    7f41bbf7-55a2-4f40-8c7c-61812abee8c3
                                </Td>
                                <Td>₹500</Td>

                                <Td>
                                    <Button colorScheme="teal">
                                        View
                                    </Button>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <Button
                                        variant="link"
                                        colorScheme="teal"
                                    >
                                        Feed a Dog
                                    </Button>
                                </Td>
                                <Td>
                                    6cf06508-885d-4844-a9e4-11cbf9a3bfae
                                </Td>
                                <Td>₹500</Td>

                                <Td>
                                    <Button colorScheme="teal">
                                        View
                                    </Button>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <Button
                                        variant="link"
                                        colorScheme="teal"
                                    >
                                        Plant a tree for life
                                    </Button>
                                </Td>
                                <Td>
                                    f1cc4b10-169a-4c5b-89d0-a83466be8cc2
                                </Td>
                                <Td>₹500</Td>

                                <Td>
                                    <Button colorScheme="teal">
                                        View
                                    </Button>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </CardBody>
        </Card>
    );
};

export default UserDonations;
