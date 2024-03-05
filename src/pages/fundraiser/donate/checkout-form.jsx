import { Badge, Button, Stack, Text, useToast } from '@chakra-ui/react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useState } from 'react';

import { useSession } from '../../../components/providers/session-provider';
import { baseapiurl } from '../../../lib/utils';

export default function CheckoutForm({
  amount,
  fundraiserId,
  anonymous,
  setIsDonationSuccess,
  setIsProccessingPayment,
}) {
  const stripe = useStripe();
  const elements = useElements();

  const { user, accessToken } = useSession();
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [isPaymentElementLoaded, setIsPaymentElementLoaded] = useState(false);

  const toast = useToast();

  const handleError = (error) => {
    setLoading(false);
    setIsProccessingPayment(false);
    setErrorMessage(error.message);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe) {
      return;
    }

    setLoading(true);
    setIsProccessingPayment(true);
    setErrorMessage(undefined);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      elements,
      params: {
        billing_details: {
          name: user.fullname,
          email: user.email,
        },
      },
    });

    if (error) {
      handleError(error);
      return;
    }

    const res = await axios.post(`${baseapiurl}/api/stripe/createConfirmIntent`, {
      uid: user.id,
      access_token: accessToken,
      amount,
      paymentMethodId: paymentMethod.id,
      fullname: user.fullname,
      email: user.email,
      fundraiserId,
    });
    const data = res.data;

    handleServerResponse(data);
  };

  const handleServerResponse = async (response) => {
    if (response.error) {
      setLoading(false);

      toast({
        title: 'Error',
        description: response.error,
        status: 'error',
        position: 'top-right',
        duration: 1000,
      });
    } else if (response.status === 'requires_action') {
      const { error, paymentIntent } = await stripe.handleNextAction({
        clientSecret: response.client_secret,
      });

      if (error) {
        handleError(error);
        await axios.post(`${baseapiurl}/api/stripe/cancelPaymentIntent`, {
          uid: user.id,
          access_token: accessToken,
          paymentIntentId: error.payment_intent.id,
        });
        setLoading(false);
      } else {
        try {
          const res = await axios.post(`${baseapiurl}/api/donation/saveDonation`, {
            uid: user.id,
            access_token: accessToken,
            fundraiserId,
            anonymous,
            paymentId: paymentIntent.id,
            amount,
            fullname: user.fullname,
          });

          const resData = res.data;
          setLoading(false);
          setIsProccessingPayment(false);

          if (resData.statusCode === 200) {
            toast({
              title: 'Success',
              description: 'Payment successful and mail sent!',
              status: 'success',
              position: 'top-right',
              duration: 1000,
            });
            setIsDonationSuccess(true);
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
          setLoading(false);
          setIsProccessingPayment(false);
          toast({
            title: 'Error',
            description: e.message,
            status: 'error',
            position: 'top-right',
            duration: 1000,
          });
        }
      }
    } else {
      setLoading(false);
      // No actions needed, show success message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="14px">
        <div>
          <Badge>For testing purpose: 4000003560000008 (India only)</Badge>
        </div>
        <Stack>
          <PaymentElement onReady={() => setIsPaymentElementLoaded(true)} />
          <Button type="submit" isLoading={loading} colorScheme="green" isDisabled={!isPaymentElementLoaded}>
            Pay
          </Button>
          {loading && <Text>Please do not close this window, your payment is beign processed</Text>}
          {errorMessage && <Text color="red">{errorMessage}</Text>}
        </Stack>
      </Stack>
    </form>
  );
}
