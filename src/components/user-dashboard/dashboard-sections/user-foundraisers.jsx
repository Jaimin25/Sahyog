import {
    Card,
    CardBody,
    CardHeader,
    Heading,
    Text,
} from '@chakra-ui/react';

const UserFundraisers = () => {
    return (
        <Card className="flex-1" padding="10px">
            <CardHeader>
                <Heading>Fundraisers</Heading>
            </CardHeader>
            <CardBody>
                <Text>
                    Your fundraisers will be displayed here in
                    table form
                </Text>
            </CardBody>
        </Card>
    );
};

export default UserFundraisers;
