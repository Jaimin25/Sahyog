import {
    AspectRatio,
    Divider,
    Image,
    Stack,
    Text,
} from '@chakra-ui/react';

import {
    checkForImage,
    checkYoutubeUrl,
    getYtVideoId,
} from '../../../../lib/utils';

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
            {coverMediaUrl && checkForImage(coverMediaUrl) ? (
                <Image src={coverMediaUrl} />
            ) : coverMediaUrl &&
              checkYoutubeUrl(coverMediaUrl) ? (
                <AspectRatio maxW="100%" ratio={16 / 9}>
                    <iframe
                        title="naruto"
                        src={`https://www.youtube.com/embed/${getYtVideoId(coverMediaUrl)}`}
                        allowFullScreen
                    />
                </AspectRatio>
            ) : null}
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
