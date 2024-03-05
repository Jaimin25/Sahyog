import { AspectRatio, Button, ButtonGroup, Card, CardBody, Stack, Text } from '@chakra-ui/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { NavLink } from 'react-router-dom';

import { checkForImage, checkYoutubeUrl, getYtVideoId, timeSince } from '../../lib/utils';

const UserActiveFundraisersCard = ({ fundraiserId, fundraiserTitle, coverMediaUrl, createdAt }) => {
  const timesince = new Date(createdAt);

  return (
    <Card
      className="user-fundraisers-card-container h-full w-full place-self-center hover:cursor-pointer"
      border="1px"
      borderColor="gray.200"
      shadow="sm"
    >
      <CardBody className="flex flex-col items-center gap-3 lg:flex-row">
        {coverMediaUrl && checkForImage(coverMediaUrl) ? (
          <div className="overflow-hidden rounded-lg">
            <LazyLoadImage
              src={coverMediaUrl}
              className="aspect-video h-[150px] w-full cursor-pointer transition duration-500 hover:scale-110"
              alt={fundraiserTitle}
            />
          </div>
        ) : coverMediaUrl && checkYoutubeUrl(coverMediaUrl) ? (
          <AspectRatio ratio={16 / 9} borderRadius="lg" height="150px" className="w-[266px]">
            <iframe
              className="rounded-lg"
              src={`https://www.youtube.com/embed/${getYtVideoId(coverMediaUrl)}`}
              allowFullScreen
            />
          </AspectRatio>
        ) : null}
        <Stack>
          <Text fontWeight="semibold" className="user-fundriaser-card-title">
            {fundraiserTitle}
          </Text>
          <Text>Fundraiser created {timeSince(timesince)}</Text>
          <ButtonGroup>
            <NavLink to={`/fundraiser/${fundraiserId}/manage`}>
              <Button variant="outline" colorScheme="teal" flex="1">
                Manage
              </Button>
            </NavLink>
            <NavLink to={`/fundraiser/${fundraiserId}`}>
              <Button variant="outline" colorScheme="teal">
                View
              </Button>
            </NavLink>
          </ButtonGroup>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default UserActiveFundraisersCard;
