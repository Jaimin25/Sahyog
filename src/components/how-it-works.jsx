import { Box, Card, CardBody, CardHeader, Heading, ListItem, OrderedList, UnorderedList } from '@chakra-ui/react';

const HowItWorks = () => {
  return (
    <Card>
      <CardHeader>
        <Heading size="lg">Here&apos;s how fundraising works on Sahyog</Heading>
      </CardHeader>
      <CardBody>
        <Box className="space-y-4">
          <OrderedList spacing="24px">
            <ListItem className="space-y-6">
              <Heading size="md">Follow the prompts to set up your fundraiser</Heading>
              <UnorderedList spacing="10px">
                <ListItem>Click the ‘Start a Fundraiser’ button and answer a few questions to get started</ListItem>
                <ListItem>
                  In your fundraiser description, share the reason you are fundraising in 1-3 paragraphs
                </ListItem>
                <ListItem>
                  Add details such as:
                  <UnorderedList spacing="10px" paddingTop="10px">
                    <ListItem>Who or what you’re fundraising for</ListItem>
                    <ListItem>A main image or video that represents your fundraiser</ListItem>
                  </UnorderedList>
                </ListItem>
                <ListItem>Set your fundraising goal, and remember you can always change it later</ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem className="space-y-6">
              <Heading size="md">Share your fundraiser</Heading>
              <UnorderedList spacing="10px">
                <ListItem>
                  Share your fundraiser link with your community through text messages and emails to start gaining
                  momentum
                </ListItem>
                <ListItem>
                  Continue to share your fundraiser to help reach your goals—consider posting on social media, sharing
                  in-person with a printable poster, or writing a letter to people you know
                </ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem className="space-y-6">
              <Heading size="md">Post updates and than donors</Heading>
              <UnorderedList spacing="10px">
                <ListItem>
                  Throughout your fundraising journey, you can post fundraiser updates to help increase donations and
                  keep donors informed
                </ListItem>
                <ListItem>Easily thank donors within your fundraising dashboard</ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem className="space-y-6">
              <Heading size="md">Set up bank transfers</Heading>
              <UnorderedList spacing="10px">
                <ListItem>
                  Add perosnal details and bank information to start receiving funds (you don’t need to hit your
                  fundraising goal to receive your money)
                </ListItem>
              </UnorderedList>
            </ListItem>
          </OrderedList>
        </Box>
      </CardBody>
    </Card>
  );
};

export default HowItWorks;
