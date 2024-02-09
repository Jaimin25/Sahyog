import { Button, ButtonGroup, Card, CardBody, CardFooter, Heading, Image, Progress, Stack, Text } from '@chakra-ui/react';

const FundraserCard = ({ title, coverImgLink, creator, currentlyRaised, goal }) => {
    return (
        <Card maxW="sm" className="h-full w-auto place-self-center" boxShadow="md">
            <CardBody>
                <div className="h-min overflow-hidden rounded-md">
                    <Image
                        src={coverImgLink}
                        alt={title}
                        borderRadius="lg"
                        className="aspect-video h-[200px] w-full cursor-pointer transition duration-500 hover:scale-110"
                    />
                </div>
                <Stack mt="6" spacing="3">
                    <Heading size="md">{title}</Heading>
                    <Text>
                        By <span className="font-semibold">{creator}</span>
                    </Text>
                    <Text fontSize={'larger'}>
                        <span className="font-semibold">₹{currentlyRaised.toLocaleString()}</span> raised out of ₹{goal.toLocaleString()}
                    </Text>
                    <Progress value={(currentlyRaised / goal) * 100} size="xs" colorScheme="teal" />
                </Stack>
            </CardBody>
            <CardFooter>
                <ButtonGroup spacing="2" className="flex w-full">
                    <Button variant="outline" colorScheme="teal" className="flex-1">
                        Share
                    </Button>
                    <Button variant="solid" colorScheme="teal" className="flex-1">
                        Donate
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
};

export default FundraserCard;
