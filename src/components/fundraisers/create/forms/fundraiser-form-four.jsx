import { Input, Stack, Text, Textarea } from '@chakra-ui/react';

const FundraiserFormFour = ({
    fundraiserTitle,
    fundraiserStory,
    setFundraiserTitle,
    setFundraiserStory,
}) => {
    return (
        <Stack>
            <Text fontWeight="semibold">
                Give your fundraiser a title
            </Text>
            <Input
                placeholder="Donate to help..."
                value={fundraiserTitle}
                onChange={(e) =>
                    setFundraiserTitle(e.target.value)
                }
            />
            <Text fontWeight="semibold">Tell your story</Text>
            <Textarea
                resize={'none'}
                placeholder="Hello, myself abc and I'm fundraising for"
                height={'150px'}
                value={fundraiserStory}
                isDisabled={!fundraiserTitle}
                onChange={(e) =>
                    setFundraiserStory(e.target.value)
                }
            />
        </Stack>
    );
};

export default FundraiserFormFour;
