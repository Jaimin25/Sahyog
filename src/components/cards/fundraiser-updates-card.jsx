import { Badge, Box, Button, Card, CardBody, useToast } from '@chakra-ui/react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Markup } from 'interweave';
import { useState } from 'react';

import { baseapiurl } from '../../lib/utils';

const FundraiserUpdatesCard = ({ update, user, accessToken, fundraiser, fundraiserUpdates, setFundraiserUpdates }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const toast = useToast();
  const handleDeleteUpdate = async (updateId) => {
    setIsDeleting(true);
    try {
      const res = await axios.post(`${baseapiurl}/api/fundraiser/deleteFundraiserUpdate`, {
        uid: user.id,
        access_token: accessToken,
        fundraiserId: fundraiser._id,
        updateId,
      });
      const resData = res.data;

      setIsDeleting(false);

      if (resData.statusCode === 200) {
        setFundraiserUpdates(fundraiserUpdates.filter((update) => update._id !== updateId));
        toast({
          title: 'Update deleted',
          status: 'success',
          position: 'top-right',
          duration: 1000,
        });
      } else {
        toast({
          title: 'Error',
          description: resData.message,
          status: 'error',
          position: 'top-right',
          duration: 1000,
        });
      }
    } catch (e) {
      setIsDeleting(false);
      toast({
        title: 'Error',
        description: e.message,
        status: 'error',
        position: 'top-right',
        duration: 1000,
      });
    }
  };

  return (
    <Card shadow="none" border="1px" borderColor="gray.200" marginY="8px">
      <CardBody>
        <Box className="flex space-y-4">
          <Box flex="1">
            {dayjs().diff(dayjs(update.createdAt), 'days') < 1 && <Badge colorScheme="green">new</Badge>}
            <Markup content={update.updateDetails} />
            <p className="text-sm text-gray-500">{new Date(update.createdAt).toLocaleString()}</p>
          </Box>
          <Button onClick={() => handleDeleteUpdate(update._id)} isLoading={isDeleting}>
            Delete
          </Button>
        </Box>
      </CardBody>
    </Card>
  );
};

export default FundraiserUpdatesCard;
