import { Box, Card, CardBody, Skeleton } from '@chakra-ui/react';
import { Markup } from 'interweave';

const FundraiserUpdatesSkeleton = ({ type }) => {
  if (type === 'manage') {
    return (
      <>
        <Card shadow="none" border="1px" borderColor="gray.200" marginY="8px">
          <CardBody>
            <Box flex="1" className="space-y-2">
              <Skeleton className="w-full md:w-1/2">
                <Markup content={'<p>test</p>'} />
              </Skeleton>
              <Skeleton className="w-1/2 md:w-1/4">
                <p className="text-sm text-gray-500">20-02-2024</p>
              </Skeleton>
            </Box>
          </CardBody>
        </Card>
        <Card shadow="none" border="1px" borderColor="gray.200" marginY="8px">
          <CardBody>
            <Box flex="1" className="space-y-2">
              <Skeleton className="w-full md:w-1/2">
                <Markup content={'<p>test</p>'} />
              </Skeleton>
              <Skeleton className="w-1/2 md:w-1/4">
                <p className="text-sm text-gray-500">20-02-2024</p>
              </Skeleton>
            </Box>
          </CardBody>
        </Card>
      </>
    );
  }

  return (
    <Card shadow="md" className="col-span-2">
      <CardBody>
        <Card shadow="none" border="1px" borderColor="gray.200" marginY="8px">
          <CardBody>
            <Box flex="1" className="space-y-2">
              <Skeleton className="w-full md:w-1/2">
                <Markup content={'<p>test</p>'} />
              </Skeleton>
              <Skeleton className="w-1/2 md:w-1/4">
                <p className="text-sm text-gray-500">20-02-2024</p>
              </Skeleton>
            </Box>
          </CardBody>
        </Card>
        <Card shadow="none" border="1px" borderColor="gray.200" marginY="8px">
          <CardBody>
            <Box flex="1" className="space-y-2">
              <Skeleton className="w-full md:w-1/2">
                <Markup content={'<p>test</p>'} />
              </Skeleton>
              <Skeleton className="w-1/2 md:w-1/4">
                <p className="text-sm text-gray-500">20-02-2024</p>
              </Skeleton>
            </Box>
          </CardBody>
        </Card>
      </CardBody>
    </Card>
  );
};

export default FundraiserUpdatesSkeleton;
