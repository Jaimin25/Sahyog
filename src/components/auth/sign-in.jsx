import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
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

import { supabase } from '../../lib/supabase';
import { baseapiurl } from '../../lib/utils';
import { useSession } from '../providers/session-provider';

const SignInComponent = () => {
  const { saveUserDetails } = useSession();
  const navigate = useNavigate();

  const [error, setError] = useState();

  const [isPassVisible, setIsPassVisible] = useState(false);

  const onSubmit = async (values, actions) => {
    setError(null);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (data && !error) {
      const sessionUser = data.session.user;

      try {
        const res = await axios.post(`${baseapiurl}/api/auth/sign-in`, { uid: sessionUser.id, email: values.email });

        const resData = res.data;

        if (resData.statusCode === 200) {
          sessionUser.fullname = resData.userDetails.fullname;
          sessionUser.emailVerified = resData.userDetails.emailVerified;
          sessionUser.profilePicUrl = resData.userDetails.profilePicUrl;
          saveUserDetails(sessionUser);
          navigate('/dashboard');
        } else {
          setError(resData.message);
          await supabase.auth.signOut();
        }
      } catch (error) {
        setError(error.message);
        await supabase.auth.signOut();
      }
    }
    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signin.card m-4 my-8 w-full sm:m-8 sm:w-1/2 lg:w-[30%]">
      <Card className="h-full w-full" shadow="md">
        <CardHeader>
          <Heading>Sign In</Heading>
        </CardHeader>
        <CardBody>
          {error && <Text color="red">{error}</Text>}
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form>
                <Stack spacing="4">
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input {...field} type="email" id="email" placeholder="Email" required />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, form }) => (
                      <FormControl>
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
                    Don&apos;t have an account?{' '}
                    <NavLink to="/auth/signup" className="font-semibold text-teal-600 underline hover:no-underline">
                      Sign Up
                    </NavLink>
                  </Text>
                  <Button className="w-full" colorScheme="teal" type="submit" isLoading={props.isSubmitting}>
                    Sign In
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

export default SignInComponent;
