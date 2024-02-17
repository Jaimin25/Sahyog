import {
    AspectRatio,
    Button,
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
    setActiveStep,
    coverMediaUrl,
    fundraiserCause,
    fundraiserGoal,
    fundraiserTitle,
    fundraiserStory,
}) => {
    return (
        <Stack gap="10px">
            <div className="flex items-center">
                <Text
                    fontWeight="semibold"
                    fontSize="lg"
                    className="flex-1"
                >
                    Cover Media
                </Text>
                <div>
                    <Button
                        colorScheme="teal"
                        variant="outline"
                        onClick={() => setActiveStep(2)}
                    >
                        Edit
                    </Button>
                </div>
            </div>
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
            <div className="flex items-center">
                <div className="flex flex-1 flex-col">
                    <Text fontWeight="semibold" fontSize="lg">
                        Title
                    </Text>
                    <Text>{fundraiserTitle}</Text>
                </div>
                <div>
                    <Button
                        colorScheme="teal"
                        variant="outline"
                        onClick={() => setActiveStep(3)}
                    >
                        Edit
                    </Button>
                </div>
            </div>
            <Divider />
            <div className="flex items-center">
                <div className="flex flex-1 flex-col">
                    <Text fontWeight="semibold" fontSize="lg">
                        Goal
                    </Text>
                    <Text>₹{fundraiserGoal}</Text>
                </div>
                <div>
                    <Button
                        colorScheme="teal"
                        variant="outline"
                        onClick={() => setActiveStep(2)}
                    >
                        Edit
                    </Button>
                </div>
            </div>

            <Divider />
            <div className="flex items-center">
                <div className="flex flex-1 flex-col">
                    <Text fontWeight="semibold" fontSize="lg">
                        Category
                    </Text>
                    <Text>{fundraiserCause}</Text>
                </div>
                <div>
                    <Button
                        colorScheme="teal"
                        variant="outline"
                        onClick={() => setActiveStep(1)}
                    >
                        Edit
                    </Button>
                </div>
            </div>
            <Divider />
            <div className="flex items-center">
                <div className="flex flex-1 flex-col">
                    <Text fontWeight="semibold" fontSize="lg">
                        Story
                    </Text>
                    <Text>{fundraiserStory}</Text>
                </div>
                <div>
                    <Button
                        colorScheme="teal"
                        variant="outline"
                        onClick={() => setActiveStep(3)}
                    >
                        Edit
                    </Button>
                </div>
            </div>
        </Stack>
    );
};
