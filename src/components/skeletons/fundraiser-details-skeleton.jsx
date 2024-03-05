import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Markup } from 'interweave';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { checkForImage } from '../../lib/utils';

const FundraiserDetailsSkeleton = ({ coverMediaUrl }) => {
  return (
    <Card shadow="md" className="col-span-2">
      <CardHeader>
        <Skeleton>
          <Heading>Heading</Heading>
        </Skeleton>
      </CardHeader>
      <CardBody>
        <Stack spacing="20px">
          <Skeleton>
            <Stack alignItems="center">
              {coverMediaUrl && checkForImage(coverMediaUrl) && (
                <div className="overflow-hidden rounded-lg">
                  <LazyLoadImage src={coverMediaUrl} className="aspect-video h-[400px] w-auto" />
                </div>
              )}
            </Stack>
          </Skeleton>
          <Stack direction="row" alignItems="center">
            <SkeletonCircle>
              <Avatar src={coverMediaUrl} />
            </SkeletonCircle>
            <Skeleton>
              <Text>Test is organizing this fundraiser.</Text>
            </Skeleton>
          </Stack>
          <Skeleton>
            <Divider />
            <Stack>
              <Text>Created </Text>
            </Stack>
            <Divider />
            <Stack>
              <Text>
                <Markup content={'hello'} />
              </Text>
            </Stack>
            <Stack>
              <ButtonGroup spacing="2" className="flex w-full">
                <Button
                  variant="outline"
                  colorScheme="teal"
                  className="
                      fundraiser-card-share-button
                      flex-1"
                >
                  Share
                </Button>
                <Button variant="outline" colorScheme="teal" className="fundraiser-card-donate-button flex-1">
                  Donate
                </Button>
              </ButtonGroup>
            </Stack>
            <Divider />
            <Stack spacing="20px">
              <Heading size="md">Organizer</Heading>
              <Stack direction="row">
                <Box>
                  <Avatar src={coverMediaUrl} size="sm" marginY="8px" marginX="4px" />
                </Box>
                <Box>
                  <Text fontWeight="semibold">Name</Text>
                  <Text fontSize="sm">Organizer</Text>
                  <Text fontSize="sm">city, state</Text>
                </Box>
              </Stack>
            </Stack>
          </Skeleton>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default FundraiserDetailsSkeleton;
