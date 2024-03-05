import { Alert, AlertIcon, Card, CardBody } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import CreateFundraiserComponent from '../../../components/fundraisers/create/create-fundraiser-card';
import { useSession } from '../../../components/providers/session-provider';
import { baseapiurl } from '../../../lib/utils';

const CreateFundraiserPage = () => {
  const { user, accessToken } = useSession();
  const [draftFundraiser, setDraftFundraiser] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!user) return;
    if (!user.emailVerified) return;
    setLoading(true);
    const getDraftFundraiser = async () => {
      const res = await axios.post(`${baseapiurl}/api/user/getDraftFundraiser`, {
        uid: user.id,
        access_token: accessToken,
      });
      const resData = res.data;

      if (resData.statusCode === 200) {
        setDraftFundraiser(resData.fundraiser);
        setLoading(false);
      } else {
        setLoading(false);
      }
      setLoading(false);
    };
    getDraftFundraiser();
  }, []);
  if (!user.emailVerified) {
    return (
      <div className="flex h-full items-center justify-center space-y-4 bg-black/5 px-4 py-8 sm:px-10 lg:px-14">
        <Card className="w-full">
          <CardBody>
            <Alert status="error">
              <AlertIcon />
              Please verify your email to create a fundraiser
            </Alert>
          </CardBody>
        </Card>
      </div>
    );
  }
  return (
    <div className="h-full space-y-4 bg-black/5 px-4 py-8 sm:px-10 lg:px-14">
      <CreateFundraiserComponent
        draftFundraiser={draftFundraiser}
        setDraftFundraiser={setDraftFundraiser}
        isFetching={loading}
      />
    </div>
  );
};

export default CreateFundraiserPage;
