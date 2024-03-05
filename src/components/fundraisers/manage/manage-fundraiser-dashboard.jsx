import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { baseapiurl } from '../../../lib/utils';
import DeleteFundraiserModal from '../../modals/delete-fundraiser-modal';
import { useSession } from '../../providers/session-provider';
import ManageFundraiserDashboardSkeleton from '../../skeletons/manage-fundraiser-dashboard-skeleton';
import EditFundraiserCause from './edit-view/edit-fundraiser-cause';
import EditFundraiserCoverMedia from './edit-view/edit-fundraiser-covermedia';
import EditFundraiserGoal from './edit-view/edit-fundraiser-goal';
import EditFundraiserLocation from './edit-view/edit-fundraiser-location';
import EditFundraiserStory from './edit-view/edit-fundraiser-story';
import EditFundraiserTitle from './edit-view/edit-fundraiser-title';

const ManageFundraiserDashboard = ({ setFundraiser, fundraiser, isFetching }) => {
  const { user, accessToken } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  const [fundraiserTitle, setFundraiserTitle] = useState('');
  const [fundraiserGoal, setFundraiserGoal] = useState('');
  const [fundraiserCoverMediaUrl, setFundraiserCoverMediaUrl] = useState('');
  const [fundraiserStory, setFundraiserStory] = useState('');
  const [fundraiserCause, setFundraiserCause] = useState('');
  const [fundraiserZipCode, setFundraiserZipCode] = useState('');
  const [fundraiserCity, setFundraiserCity] = useState('');
  const [fundraiserState, setFundraiserState] = useState('');

  useEffect(() => {
    setFundraiserTitle(fundraiser.fundraiserTitle);
    setFundraiserGoal(fundraiser.fundraiserGoal);
    setFundraiserCoverMediaUrl(fundraiser.coverMediaUrl);
    setFundraiserStory(fundraiser.fundraiserStory);
    setFundraiserCause(fundraiser.fundraiserCause);
    setFundraiserZipCode(fundraiser.zipCode);
    setFundraiserCity(fundraiser.fundraiserCity);
    setFundraiserState(fundraiser.fundraiserState);
  }, [fundraiser]);

  const navigate = useNavigate();

  const handleSaveFundraiser = async () => {
    setIsSaving(true);
    try {
      if (Number(fundraiserGoal) < 10000) {
        toast({
          title: 'Minimum goal should be ₹10,000',
          position: 'top-right',
          isClosable: true,
          status: 'error',
          duration: 1000,
        });
        setIsSaving(false);
        return;
      }
      const res = await axios.post(`${baseapiurl}/api/fundraiser/updateFundraiser`, {
        uid: user.id,
        access_token: accessToken,
        fundraiserId: fundraiser._id,
        fundraiserTitle,
        fundraiserGoal,
        coverMediaUrl: fundraiserCoverMediaUrl,
        fundraiserStory,
        fundraiserCause,
        zipCode: fundraiserZipCode,
        fundraiserCity,
        fundraiserState,
      });

      const resData = res.data;
      setIsSaving(false);

      if (resData.statusCode === 200) {
        toast({
          title: 'Fundraiser Updated',
          position: 'top-right',
          isClosable: true,
          status: 'success',
          duration: 1000,
        });
        setFundraiser(resData.fundraiser);
      } else {
        toast({
          title: resData.message,
          position: 'top-right',
          isClosable: true,
          status: 'error',
          duration: 1000,
        });
      }
    } catch (e) {
      setIsSaving(false);
      toast({
        title: e.message,
        position: 'top-right',
        isClosable: true,
        status: 'error',
        duration: 1000,
      });
    }
  };

  const handleDeleteFundraiser = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${baseapiurl}/api/user/deleteFundraiser`, {
        uid: user.id,
        access_token: accessToken,
        fundraiserId: fundraiser._id,
      });
      const resData = res.data;
      setLoading(false);

      if (resData.statusCode === 200) {
        navigate('/');
      } else {
        toast({
          title: resData.message,
          position: 'top-right',
          isClosable: true,
          status: 'error',
          duration: 1000,
        });
      }
    } catch (e) {
      toast({
        title: e.message,
        position: 'top-right',
        isClosable: true,
        status: 'error',
        duration: 1000,
      });
      setLoading(false);
    }
  };

  if (isFetching) {
    return <ManageFundraiserDashboardSkeleton />;
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <Stack>
          <Box className="flex">
            <Box className="flex-1">
              <Text fontWeight="semibold" fontSize="20px">
                Title
              </Text>
              <EditFundraiserTitle
                fundraiser={fundraiser}
                fundraiserTitle={fundraiserTitle}
                setFundraiserTitle={setFundraiserTitle}
              />
            </Box>
          </Box>
          <StackDivider />
          <Divider />
          <StackDivider />
          <Box className="flex">
            <Box className="flex-1">
              <Text fontWeight="semibold" fontSize="20px">
                Goal
              </Text>
              <EditFundraiserGoal
                fundraiser={fundraiser}
                fundraiserGoal={fundraiserGoal}
                setFundraiserGoal={setFundraiserGoal}
              />
            </Box>
          </Box>
          <StackDivider />
          <Divider />
          <StackDivider />
          <Box className="w-full">
            <Box className="flex w-full items-center">
              <Text fontWeight="semibold" fontSize="20px" flex="1">
                Cover Media
              </Text>
            </Box>
            <EditFundraiserCoverMedia
              fundraiser={fundraiser}
              fundraiserCoverMediaUrl={fundraiserCoverMediaUrl}
              setFundraiserCoverMediaUrl={setFundraiserCoverMediaUrl}
            />
          </Box>
          <StackDivider />
          <Divider />
          <StackDivider />
          <Box className="flex">
            <Box className="flex-1">
              <Text fontWeight="semibold" fontSize="20px">
                Story
              </Text>
              <EditFundraiserStory
                fundraiser={fundraiser}
                fundraiserStory={fundraiserStory}
                setFundraiserStory={setFundraiserStory}
              />
            </Box>
          </Box>
          <StackDivider />
          <Divider />
          <StackDivider />
          <Box className="flex">
            <Box className="flex-1">
              <Text fontWeight="semibold" fontSize="20px">
                Category
              </Text>
              <EditFundraiserCause
                fundraiser={fundraiser}
                fundraiserCause={fundraiserCause}
                setFundraiserCause={setFundraiserCause}
              />
            </Box>
          </Box>
          <StackDivider />
          <Divider />
          <StackDivider />
          <Box className="flex">
            <Box className="flex-1">
              <Text fontWeight="semibold" fontSize="20px">
                Location
              </Text>

              <EditFundraiserLocation
                fundraiser={fundraiser}
                fundraiserCity={fundraiserCity}
                fundraiserState={fundraiserState}
                setFundraiserCity={setFundraiserCity}
                setFundraiserState={setFundraiserState}
                fundraiserZipCode={fundraiserZipCode}
                setFundraiserZipCode={setFundraiserZipCode}
              />
            </Box>
          </Box>
        </Stack>
        <Box className="flex justify-end">
          {' '}
          <ButtonGroup>
            <Button colorScheme="red" onClick={onOpen} isDisabled={isSaving}>
              Delete
            </Button>
            <Button
              colorScheme="teal"
              isLoading={isSaving}
              isDisabled={
                !fundraiserTitle ||
                !fundraiserCause ||
                !fundraiserStory ||
                !fundraiserGoal ||
                !fundraiserCoverMediaUrl ||
                !fundraiserCity ||
                !fundraiserState ||
                !fundraiserZipCode ||
                (fundraiserTitle === fundraiser.fundraiserTitle &&
                  fundraiserCause === fundraiser.fundraiserCause &&
                  fundraiserStory === fundraiser.fundraiserStory &&
                  fundraiserGoal === fundraiser.fundraiserGoal &&
                  fundraiserCoverMediaUrl === fundraiser.coverMediaUrl &&
                  fundraiserCity === fundraiser.fundraiserCity &&
                  fundraiserState === fundraiser.fundraiserState &&
                  fundraiserZipCode === fundraiser.zipCode)
              }
              onClick={handleSaveFundraiser}
            >
              Save
            </Button>
          </ButtonGroup>
        </Box>
      </div>
      <DeleteFundraiserModal
        isOpen={isOpen}
        onClose={onClose}
        loading={loading}
        handleDeleteFundraiser={handleDeleteFundraiser}
      />
    </>
  );
};

export default ManageFundraiserDashboard;
