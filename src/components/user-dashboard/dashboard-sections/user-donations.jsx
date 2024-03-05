import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const UserDonations = ({ donations }) => {
  // const handleDetailsButtonClick = async (paymentId) => {
  //     try {
  //         console.log(paymentId);
  //         const res = await axios.post(
  //             `${baseapiurl}/api/stripe/getPaymentDetailsById`,
  //             {
  //                 uid: user.id,
  //                 access_token: accessToken,
  //                 paymentId,
  //             }
  //         );
  //         console.log(res.data);
  //         console.log(
  //             new Date(
  //                 res.data.paymentIntent.created
  //             ).toUTCString()
  //         );
  //     } catch (e) {}
  // };

  if (!donations || donations.length === 0) {
    return (
      <Card className="flex-1" padding="10px">
        <CardHeader>
          <Heading>Donations</Heading>
        </CardHeader>
        <CardBody>
          <Stack>
            <Heading size="sm">No donations found</Heading>
            <NavLink to="/fundraisers/discover">
              <Button colorScheme="teal">Donate Now to a Fundraiser</Button>
            </NavLink>
          </Stack>
        </CardBody>
      </Card>
    );
  }

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
                {/* <Th>More Details</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {donations
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((donation) => (
                  <Tr key={donation._id}>
                    <Td>
                      <NavLink to={`/fundraiser/${donation.fundraiserId}`}>
                        <Button variant="link" colorScheme="teal">
                          {donation.fundraiserTitle}
                        </Button>
                      </NavLink>
                    </Td>
                    <Td>{donation.paymentId}</Td>
                    <Td>₹{donation.donationAmount}</Td>
                    {/* <Td>
                                            <Button
                                                colorScheme="teal"
                                                onClick={() =>
                                                    handleDetailsButtonClick(
                                                        donation.paymentId
                                                    )
                                                }
                                            >
                                                View
                                            </Button>
                                        </Td> */}
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
