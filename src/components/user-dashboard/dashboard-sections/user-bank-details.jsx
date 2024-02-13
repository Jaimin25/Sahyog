import {
    Card,
    CardBody,
    CardHeader,
    Heading,
    Text,
} from '@chakra-ui/react';

const UserBankDetails = () => {
    return (
        <Card className="flex-1" padding="10px">
            <CardHeader>
                <Heading>Bank Details</Heading>
            </CardHeader>
            <CardBody>
                <Text>Bank details will be displayed here</Text>
            </CardBody>
        </Card>
    );
};

export default UserBankDetails;
