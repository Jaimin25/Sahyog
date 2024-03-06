import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { ImagePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import validator from 'validator';

import { supabase } from '../../../lib/supabase';
import { baseapiurl } from '../../../lib/utils';
import { useSession } from '../../providers/session-provider';

const UserAccountDetails = () => {
  const { user, accessToken, saveUserDetails } = useSession();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [isSavingChanges, setIsSavingChanges] = useState(false);
  const [isSendingMail, setIsSendingMail] = useState(false);

  const [userEmail, setUserEmail] = useState();
  const [userFullname, setUserFullname] = useState();

  useEffect(() => {
    setUserEmail(user.email);
    setUserFullname(user.fullname);
  }, []);

  const handleResendButton = async () => {
    setIsSendingMail(true);
    try {
      const res = await axios.post(`${baseapiurl}/api/auth/resendVerificationMail`, {
        uid: user.id,
        access_token: accessToken,
        email: user.email,
      });

      const resData = res.data;
      setIsSendingMail(false);
      if (resData.statusCode === 200) {
        toast({
          title: 'Verification mail sent',
          description: 'Please check your email',
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
      setIsSendingMail(false);
      toast({
        title: 'Error',
        description: e.message,
        status: 'error',
        position: 'top-right',
        duration: 1000,
      });
    }
  };

  const handleSaveChanges = async () => {
    setIsSavingChanges(true);
    try {
      if (validator.isEmail(userEmail)) {
        if (userEmail !== user.email) {
          const { data, error } = await supabase.auth.updateUser({
            email: userEmail,
          });
          setIsSavingChanges(false);

          if (error) {
            toast({
              title: 'Error',
              description: error.message,
              status: 'error',
              position: 'top-right',
              duration: 1500,
            });
          } else if (data) {
            toast({
              title: 'Confirm Mail',
              description: 'Please check your email to confirm the new email',
              status: 'success',
              position: 'top-right',
              duration: 1500,
            });
          }
        }
      } else {
        setIsSavingChanges(false);

        toast({
          title: 'Error',
          description: 'Please enter a valid email',
          status: 'error',
          position: 'top-right',
          duration: 1000,
        });
      }

      if (userFullname !== user.fullname) {
        const res = await axios.post(`${baseapiurl}/api/user/changeUserFullname`, {
          uid: user.id,
          access_token: accessToken,
          fullname: userFullname,
        });
        const resData = res.data;
        setIsSavingChanges(false);
        if (resData.statusCode === 200) {
          user.fullname = userFullname;
          saveUserDetails(user);
          toast({
            title: 'Fullname updated',
            description: 'Your fullname has been updated',
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
      }
    } catch (e) {
      setIsSavingChanges(false);
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
    <Card className="flex-1" padding="10px">
      <CardHeader>
        {!user.emailVerified && (
          <Alert>
            <AlertIcon />
            Please verify your email in order to create a fundraiser or to donate
          </Alert>
        )}
        <Heading>Account Details</Heading>
      </CardHeader>
      <CardBody>
        <Stack>
          <Text fontWeight="semibold">Profile Photo</Text>
          <div>
            <Button height="142px" width="142px" rounded="full" variant="outline">
              <p className="flex flex-col items-center gap-2">
                <ImagePlus />
                Add Photo
              </p>
            </Button>
          </div>
          <Text fontWeight="semibold">Full Name</Text>
          <Input
            value={userFullname}
            type="text"
            onChange={(e) => {
              setUserFullname(e.target.value);
            }}
            isRequired
          />
          <Text className="text-sm text-gray-600">Name must be same as per your Aadhar Card</Text>
          <Text fontWeight="semibold" className="">
            Email {!user.emailVerified && <Badge color="red">unverified</Badge>}
          </Text>
          <Box className="flex flex-col items-start gap-2">
            <Input
              type="email"
              isRequired
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
            />
            {!user.emailVerified && (
              <Button colorScheme="teal" variant="link" onClick={handleResendButton} isLoading={isSendingMail}>
                Send Verification Mail
              </Button>
            )}
          </Box>
        </Stack>
      </CardBody>
      <CardFooter gap="10px">
        <Button
          colorScheme="teal"
          isDisabled={!userEmail || !userFullname || (userEmail === user.email && userFullname === user.fullname)}
          isLoading={isSavingChanges}
          onClick={handleSaveChanges}
        >
          Save
        </Button>
        <Button
          variant="solid"
          colorScheme="red"
          onClick={async () => {
            setLoading(true);
            const { error } = await supabase.auth.signOut();
            if (!error) {
              setLoading(false);
            }
          }}
          isLoading={loading}
          isDisabled={isSavingChanges}
        >
          Logout
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserAccountDetails;
