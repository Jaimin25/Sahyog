import {
  Alert,
  AlertIcon,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';

import { baseapiurl } from '../../../lib/utils';
import ConfirmDetailsModal from '../../modals/confirm-details-modal';
import { useSession } from '../../providers/session-provider';

const UserOtherDetails = ({ otherDetails, setUserOtherDetails }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [values, setValues] = useState();
  const [actions, setActions] = useState();

  const { user, accessToken } = useSession();
  const toast = useToast();

  const handleSubmitForm = async (values, actions) => {
    actions.setSubmitting(true);
    try {
      const res = await axios.post(`${baseapiurl}/api/user/saveUserOtherDetails`, {
        access_token: accessToken,
        uid: user.id,
        values,
      });
      const resData = res.data;

      actions.setSubmitting(false);
      if (resData.statusCode === 200) {
        setUserOtherDetails(resData.details);
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
      actions.setSubmitting(false);
      toast({
        title: 'Error',
        description: e.message,
        status: 'error',
        position: 'top-right',
        duration: 1000,
      });
    }
  };

  useEffect(() => {
    if (confirmSubmit) {
      handleSubmitForm(values, actions);
    }
  }, [confirmSubmit]);

  return (
    <>
      <Card className="flex-1" padding="10px">
        <CardBody>
          <Stack spacing="4">
            {otherDetails && otherDetails.status === 'review' && (
              <Alert>
                <AlertIcon />
                Under review
              </Alert>
            )}
            {!user.emailVerified && (
              <Alert>
                <AlertIcon />
                Please verify your email to add bank details
              </Alert>
            )}
            <Formik
              initialValues={{
                gender: '',
                dateOfBirth: '',
                govtIdType: '',
                govtIdNumber: '',
                accountHolderName: '',
                accountNumber: '',
                ifscCode: '',
                bankName: '',
                accountType: '',
              }}
              onSubmit={(values, actions) => {
                onOpen();
                actions.setSubmitting(false);
                setValues(values);
                setActions(actions);
              }}
            >
              {(props) => (
                <Form className="space-y-8">
                  <Stack>
                    <Heading>Personal Details</Heading>
                    <Stack>
                      <Field name="gender">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Gender</FormLabel>
                            <Select
                              {...field}
                              value={otherDetails && otherDetails.gender}
                              isDisabled={!user.emailVerified || (otherDetails && otherDetails.gender)}
                              placeholder="Gender"
                              isRequired
                            >
                              <option>Male</option>
                              <option>Female</option>
                              <option>Other</option>
                            </Select>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="dateOfBirth">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Date of birth</FormLabel>
                            <Input
                              {...field}
                              value={otherDetails && otherDetails.dob}
                              isDisabled={!user.emailVerified || (otherDetails && otherDetails.dob)}
                              type="date"
                              isRequired
                            />
                          </FormControl>
                        )}
                      </Field>
                    </Stack>
                  </Stack>
                  <Stack>
                    <Heading>Govt. ID Details</Heading>
                    <Stack>
                      <Field name="govtIdType">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Govt. ID Type</FormLabel>
                            <Select
                              {...field}
                              value={otherDetails && otherDetails.govtIDType}
                              isDisabled={!user.emailVerified || (otherDetails && otherDetails.govtIDType)}
                              placeholder="Govt. ID"
                              isRequired
                            >
                              <option>Aadhaar card</option>
                              <option>Pan card</option>
                            </Select>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="govtIdNumber">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Govt. ID Number</FormLabel>
                            <Input
                              {...field}
                              value={otherDetails && otherDetails.govtIDNumber}
                              isDisabled={!user.emailVerified || (otherDetails && otherDetails.govtIDNumber)}
                              type="text"
                              placeholder="ID number"
                              isRequired
                            />
                          </FormControl>
                        )}
                      </Field>
                    </Stack>
                  </Stack>
                  <Stack>
                    <Heading>Bank Details</Heading>
                    <Stack>
                      <Field name="accountHolderName">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Account Holder Name</FormLabel>
                            <Input
                              {...field}
                              placeholder="Account holder name"
                              value={otherDetails && otherDetails.accountHolderName}
                              isDisabled={!user.emailVerified || (otherDetails && otherDetails.accountHolderName)}
                              isRequired
                            />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="accountNumber">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Account Number</FormLabel>
                            <Input
                              {...field}
                              placeholder="Account number"
                              value={otherDetails && otherDetails.accountNumber}
                              isDisabled={!user.emailVerified || (otherDetails && otherDetails.accountNumber)}
                              isRequired
                            />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="ifscCode">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>IFSC Code</FormLabel>
                            <Input
                              {...field}
                              placeholder="IFSC code"
                              value={otherDetails && otherDetails.ifscCode}
                              isDisabled={!user.emailVerified || (otherDetails && otherDetails.ifscCode)}
                              isRequired
                            />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="bankName">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Bank Name</FormLabel>
                            <Input
                              {...field}
                              placeholder="Bank name"
                              value={otherDetails && otherDetails.bankName}
                              isDisabled={!user.emailVerified || (otherDetails && otherDetails.bankName)}
                              isRequired
                            />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="accountType">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Account Type</FormLabel>
                            <Select
                              {...field}
                              placeholder="Account type"
                              value={otherDetails && otherDetails.accountType}
                              isDisabled={!user.emailVerified || (otherDetails && otherDetails.accountType)}
                              isRequired
                            >
                              <option value="savings">Savings</option>
                              <option value="current">Current</option>
                            </Select>
                          </FormControl>
                        )}
                      </Field>
                    </Stack>
                  </Stack>
                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
                    isDisabled={!user.emailVerified || (otherDetails && otherDetails.status === 'review')}
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </Stack>
        </CardBody>
      </Card>
      <ConfirmDetailsModal isOpen={isOpen} onClose={onClose} setConfirmSubmit={setConfirmSubmit} />
    </>
  );
};

export default UserOtherDetails;
