import { Divider, Image, Stack, Text } from '@chakra-ui/react';

export const FundraiserFormPublish = ({
    coverMediaUrl,
    fundraiserCause,
    fundraiserGoal,
    fundraiserTitle,
    fundraiserStory,
}) => {
    return (
        <Stack gap="10px">
            <Text fontWeight="semibold" fontSize="lg">
                Cover Media
            </Text>
            <Image src={coverMediaUrl} />
            <Text fontWeight="semibold" fontSize="lg">
                Title
            </Text>
            <Text>{fundraiserTitle}</Text>
            <Divider />
            <Text fontWeight="semibold" fontSize="lg">
                Goal
            </Text>
            <Text>₹{fundraiserGoal}</Text>

            <Divider />
            <Text fontWeight="semibold" fontSize="lg">
                Category
            </Text>
            <Text>{fundraiserCause}</Text>
            <Divider />
            <Text fontWeight="semibold" fontSize="lg">
                Story
            </Text>
            <Text>{fundraiserStory}</Text>
        </Stack>
    );
};
