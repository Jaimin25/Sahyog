import { Box, Stack, Text } from '@chakra-ui/react';
import { HeartHandshake } from 'lucide-react';

const DonationsCard = ({ name, amount, anonymous, donatedAt }) => {
  return (
    <Stack direction="row" alignItems="center" gap="16px">
      <Box>
        <Box className="flex items-center rounded-full bg-gray-200 p-2">
          <HeartHandshake />
        </Box>
      </Box>
      <Stack gap="0px">
        {anonymous ? <Text>Anonymous</Text> : <Text>{name}</Text>}
        <Box className="flex gap-2">
          <Text fontWeight="semibold">₹{amount}</Text>•<Text color="gray.600">{donatedAt}</Text>
        </Box>
      </Stack>
    </Stack>
  );
};

export default DonationsCard;
