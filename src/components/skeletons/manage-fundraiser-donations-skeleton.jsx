import { Box, Button, Progress, Skeleton, SkeletonCircle, Stack, Text } from '@chakra-ui/react';
import { ArrowUpRightFromSquare, HeartHandshake } from 'lucide-react';

const ManageFundraiserDonationSkeleton = () => {
  return (
    <Stack height="100%">
      <Skeleton>
        <Stack direction="row" alignItems="baseline">
          <Text size="md" fontSize="32px">
            ₹{1000}
          </Text>
          <Text fontSize="16px" color="gray.600">
            INR raised out of {10000} goal
          </Text>
        </Stack>
        <Progress value={10} size="xs" colorScheme="teal" />
      </Skeleton>
      <Skeleton>
        <Text color="gray.600">0 donations</Text>
      </Skeleton>
      <Stack>
        <Skeleton>
          <Button variant="outline" colorScheme="teal" className="fundraiser-card-donate-button">
            Donate now
          </Button>
          <Button
            variant="outline"
            colorScheme="teal"
            className="
                      fundraiser-card-share-button
                       items-center gap-2"
          >
            <ArrowUpRightFromSquare className="h-5 w-5" />
            Share
          </Button>
        </Skeleton>
        {Array(3)
          .fill()
          .map((_, index) => (
            <Stack gap="18px" key={index}>
              <Stack direction="row" alignItems="center" gap="16px">
                <SkeletonCircle>
                  <Box>
                    <Box className="flex items-center rounded-full bg-gray-200 p-2">
                      <HeartHandshake />
                    </Box>
                  </Box>
                </SkeletonCircle>
                <Stack gap="10px" width="100%">
                  <Skeleton width="75%">
                    <Text>abc</Text>
                  </Skeleton>
                  <Skeleton width="50%">
                    <Box className="flex gap-2">
                      <Text fontWeight="semibold">₹{1000}</Text>•<Text color="gray.600">{1000}</Text>
                    </Box>
                  </Skeleton>
                </Stack>
              </Stack>
            </Stack>
          ))}
      </Stack>
    </Stack>
  );
};

export default ManageFundraiserDonationSkeleton;
