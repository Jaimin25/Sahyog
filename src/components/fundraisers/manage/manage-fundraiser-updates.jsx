import { Box, Button, Heading, Stack, useToast } from '@chakra-ui/react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { useState } from 'react';

import { baseapiurl } from '../../../lib/utils';
import FundraiserUpdatesCard from '../../cards/fundraiser-updates-card';
import { useSession } from '../../providers/session-provider';
import FundraiserUpdatesSkeleton from '../../skeletons/fundraiser-updates-skeleton';

const ManageFundraiserUpdates = ({ fundraiser, fundraiserUpdates, setFundraiserUpdates, isFetching }) => {
  const toast = useToast();
  const { user, accessToken } = useSession();
  const [updateDetails, setUpdateDetails] = useState();
  const [isPosting, setIsPosting] = useState();

  const handlePostUpdates = async () => {
    setIsPosting(true);
    try {
      const res = await axios.post(`${baseapiurl}/api/fundraiser/postFundraiserUpdate`, {
        uid: user.id,
        access_token: accessToken,
        fundraiserId: fundraiser._id,
        updateDetails,
      });

      const resData = res.data;
      setIsPosting(false);
      if (resData.statusCode === 200) {
        setUpdateDetails('');
        setFundraiserUpdates([resData.fundraiserUpdate, ...fundraiserUpdates]);
        toast({
          title: 'Updated posted',
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
      setIsPosting(false);
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
    <Stack gap="16px">
      <Box className="space-y-4">
        <Heading size="lg">Post an update</Heading>
        <Box height="300px">
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            onEditorChange={(c) => setUpdateDetails(c)}
            value={updateDetails}
            disabled={isFetching}
            init={{
              height: '100%',
              menubar: false,
              plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'code',
                'help',
                'wordcount',
              ],
              toolbar:
                'undo redo | blocks | ' + 'bold italic forecolor | alignleft aligncenter ' + 'alignright alignjustify ',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
        </Box>
        <Box textAlign="end">
          <Button colorScheme="teal" isDisabled={!updateDetails} isLoading={isPosting} onClick={handlePostUpdates}>
            Post
          </Button>
        </Box>
      </Box>
      <Box className="space-y-4">
        <Heading size="md">Updates</Heading>
        {!isFetching && fundraiserUpdates.length === 0 && <p>No updates yet</p>}
        {isFetching ? (
          <FundraiserUpdatesSkeleton type="manage" />
        ) : (
          fundraiserUpdates.map((update) => (
            <FundraiserUpdatesCard
              key={update._id}
              user={user}
              accessToken={accessToken}
              update={update}
              fundraiser={fundraiser}
              fundraiserUpdates={fundraiserUpdates}
              setFundraiserUpdates={setFundraiserUpdates}
            />
          ))
        )}
      </Box>
    </Stack>
  );
};

export default ManageFundraiserUpdates;
