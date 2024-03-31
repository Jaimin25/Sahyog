import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  HStack,
  Progress,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { NavLink } from 'react-router-dom';

import { checkForImage, checkYoutubeUrl, getYtVideoId } from '../../lib/utils';
import ShareFundraiserModal from '../modals/share-fundraiser-modal';

const FundriaserCard = ({
  fundraiserId,
  fundraiserTitle,
  coverMediaUrl,
  creatorName,
  profilePicUrl,
  amountRaised,
  fundraiserGoal,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Card
        maxW="sm"
        className="fundraiser-card-container h-full w-full place-self-center hover:cursor-pointer"
        shadow="md"
      >
        <NavLink to={`/fundraiser/${fundraiserId}`} className="h-full">
          <CardBody className="flex h-full flex-col">
            {coverMediaUrl && checkForImage(coverMediaUrl) ? (
              <div className="overflow-hidden rounded-lg">
                <LazyLoadImage
                  src={coverMediaUrl}
                  className="aspect-video h-[200px] w-full cursor-pointer transition duration-500 hover:scale-110"
                  alt={fundraiserTitle}
                  height="200px"
                  width="100%"
                />
              </div>
            ) : coverMediaUrl && checkYoutubeUrl(coverMediaUrl) ? (
              <AspectRatio maxW="100%" ratio={16 / 9} borderRadius="lg" height="200px">
                <iframe
                  className="rounded-lg"
                  src={`https://www.youtube.com/embed/${getYtVideoId(coverMediaUrl)}`}
                  allowFullScreen
                />
              </AspectRatio>
            ) : null}
            <Stack mt="6" spacing="3" className="flex flex-1">
              <Heading size="md" className="fundraiser-card-title flex-1">
                {fundraiserTitle}
              </Heading>
              <HStack>
                <Avatar src={profilePicUrl} size="sm" />
                <Text>
                  By <span className="font-semibold">{creatorName}</span>
                </Text>
              </HStack>
              <Text fontSize={'larger'}>
                <span className="font-semibold">₹{amountRaised.toLocaleString('en-IN').toString()}</span> raised out of
                ₹{fundraiserGoal.toLocaleString('en-IN').toString()}
              </Text>
              <Progress
                value={(amountRaised / fundraiserGoal) * 100}
                size="xs"
                colorScheme="teal"
                aria-label="goal_progress"
              />
            </Stack>
          </CardBody>
        </NavLink>
        <CardFooter>
          <ButtonGroup spacing="2" direction="row" className="flex w-full">
            <Box className="w-full flex-1">
              <Button
                variant="outline"
                colorScheme="teal"
                className="fundraiser-card-share-button
                        w-full
                        "
                onClick={onOpen}
              >
                Share
              </Button>
            </Box>
            <NavLink to={`/fundraiser/${fundraiserId}/donate`} className="w-full flex-1">
              <Button variant="solid" colorScheme="teal" className="fundraiser-card-donate-button w-full">
                Donate
              </Button>
            </NavLink>
          </ButtonGroup>
        </CardFooter>
      </Card>
      <ShareFundraiserModal
        fundraiserId={fundraiserId}
        fundraiserCreatorName={creatorName}
        fundraiserTitle={fundraiserTitle}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default FundriaserCard;
