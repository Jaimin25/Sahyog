import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { EyeIcon, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import validator from 'validator';

import { supabase } from '../../lib/supabase';
import { baseapiurl } from '../../lib/utils';
import { useSession } from '../providers/session-provider';

const SignUpComponent = () => {
  const { saveUserDetails } = useSession();
  const navigate = useNavigate();

  const [error, setError] = useState();

  const [isPassVisible, setIsPassVisible] = useState(false);

  const onSubmit = async (values, actions) => {
    setError(null);

    if (!validator.isEmail(values.email)) {
      return setError('Invalid email');
    }

    if (!(values.fullname.length >= 3)) {
      return setError('Fullname must be greater than 3');
    }

    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (data && !error) {
      const user = data.session.user;
      try {
        const res = await axios.post(`${baseapiurl}/api/auth/sign-up`, {
          uid: user.id,
          fullname: values.fullname,
          email: values.email,
        });

        const resData = res.data;

        if (resData.statusCode === 200) {
          user.fullname = resData.userDetails.fullname;
          user.emailVerified = resData.userDetails.emailVerified;
          user.profilePicUrl = resData.userDetails.profilePicUrl;
          saveUserDetails(user);

          navigate('/dashboard');
        } else {
          await supabase.auth.signOut();
        }
      } catch (error) {
        setError(error.message);
        await supabase.auth.signOut();
      }
    }

    if (error) {
      if (error.message.toLowerCase() === 'user already registered') {
        setError('User with email already registered');
      } else {
        setError(error.message);
      }
    }
  };
  return (
    <div className="signup.card m-4 my-8 w-full sm:m-8 sm:w-1/2 lg:w-[30%]">
      <Card className="h-full w-full" shadow="md">
        <CardHeader>
          <Heading>Sign Up</Heading>
        </CardHeader>
        <CardBody>
          {error && <Text color="red">{error}</Text>}
          <Formik
            initialValues={{
              fullname: '',
              email: '',
              password: '',
            }}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form>
                <Stack spacing="4">
                  <Field name="fullname">
                    {({ field, form }) => (
                      <FormControl isRequired>
                        <FormLabel>Full Name</FormLabel>
                        <Input {...field} type="text" id="fullname" placeholder="Fullname" required />
                        <FormHelperText>Name as mentioned in your Aadhar card</FormHelperText>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input {...field} type="email" id="email" placeholder="Email" required />
                        <FormHelperText>Verification will be sent on this email</FormHelperText>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, form }) => (
                      <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          <Input
                            type={!isPassVisible ? 'password' : 'text'}
                            id="password"
                            placeholder="Password"
                            {...field}
                            required
                          />
                          <InputRightAddon
                            onClick={() => setIsPassVisible(!isPassVisible)}
                            className="hover:cursor-pointer"
                          >
                            {isPassVisible ? <EyeOff className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                          </InputRightAddon>
                        </InputGroup>
                      </FormControl>
                    )}
                  </Field>
                  <Text>
                    Already have an account?{' '}
                    <NavLink to="/auth/signin" className="font-semibold text-teal-600 underline hover:no-underline">
                      Sign In
                    </NavLink>
                  </Text>
                  <Button className="w-full" colorScheme="teal" type="submit" isLoading={props.isSubmitting}>
                    Sign Up
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignUpComponent;
