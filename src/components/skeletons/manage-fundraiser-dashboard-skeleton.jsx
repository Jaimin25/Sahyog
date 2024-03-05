import { Box, Button, Divider, Skeleton, Stack, StackDivider, Text } from '@chakra-ui/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ManageFundraiserDashboardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <Stack>
        <Skeleton>
          <Box className="flex">
            <Box className="flex-1">
              <Text fontWeight="semibold" fontSize="20px">
                Title
              </Text>
              <Text>test</Text>
            </Box>
            <Button variant="outline">Edit</Button>
          </Box>
        </Skeleton>

        <StackDivider />
        <Divider />
        <StackDivider />
        <Skeleton>
          <Box className="flex">
            <Box className="flex-1">
              <Text fontWeight="semibold" fontSize="20px">
                Goal
              </Text>
              <Text>100</Text>
            </Box>
            <Button variant="outline">Edit</Button>
          </Box>
        </Skeleton>
        <StackDivider />
        <Divider />
        <StackDivider />
        <Box className="w-full space-y-4">
          <Skeleton>
            <Box className="flex w-full items-center">
              <Text fontWeight="semibold" fontSize="20px" flex="1">
                Cover Media
              </Text>
              <Button variant="outline">Change</Button>
            </Box>
            <div className="overflow-hidden rounded-lg">
              <LazyLoadImage
                src="https://www.trackbee.com/assets/uploads/blogs/1631001708_Blog-Post_April-22.jpg"
                className="aspect-video h-auto w-auto rounded-lg lg:h-[400px]"
              />
            </div>
          </Skeleton>
        </Box>
        <StackDivider />
        <Divider />
        <StackDivider />
        <Skeleton>
          <Box className="flex">
            <Box className="flex-1">
              <Text fontWeight="semibold" fontSize="20px">
                Story
              </Text>
              hello
            </Box>
            <Button variant="outline">Edit</Button>
          </Box>
        </Skeleton>
        <StackDivider />
        <Divider />
        <StackDivider />
        <Skeleton>
          {' '}
          <Box className="flex">
            <Box className="flex-1">
              <Text fontWeight="semibold" fontSize="20px">
                Category
              </Text>
              <Text>hello</Text>
            </Box>
            <Button variant="outline">Edit</Button>
          </Box>
        </Skeleton>

        <StackDivider />
        <Divider />
        <StackDivider />

        <Skeleton>
          <Box className="flex">
            <Box className="flex-1">
              <Text fontWeight="semibold" fontSize="20px">
                Location
              </Text>
              <Text>hello, tst = 234</Text>
            </Box>
            <Button variant="outline">Edit</Button>
          </Box>
        </Skeleton>
      </Stack>
    </div>
  );
};

export default ManageFundraiserDashboardSkeleton;
