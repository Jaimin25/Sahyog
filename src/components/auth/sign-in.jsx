import {
    Button,
    Card,
    CardBody,
    CardHeader,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { supabase } from '../../lib/supabase';
import { baseapiurl } from '../../lib/utils';
import { useSession } from '../providers/session-provider';

const SignInComponent = () => {
    const { saveUserDetails } = useSession();
    const navigate = useNavigate();

    const [error, setError] = useState();

    const onSubmit = async (values, actions) => {
        setError(null);
        const { data, error } =
            await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
            });

        if (data && !error) {
            const user = data.session.user;

            try {
                const res = await axios.post(
                    `${baseapiurl}/api/auth/sign-in`,
                    { uid: user.id, email: values.email }
                );

                const resData = res.data;
                if (resData.statusCode === 200) {
                    user.fullname = resData.userDetails.fullname;
                    user.emailVerified =
                        resData.userDetails.emailVerified;
                    user.profilePicUrl =
                        resData.userDetails.profilePicUrl;
                    saveUserDetails(user);
                    navigate('/dashboard');
                }
            } catch (error) {
                setError(error.message);
            }
        }
        if (error) {
            setError(error.message);
        }
    };

    return (
        <div className="signin.card m-10 w-3/4 sm:w-1/2 lg:w-[30%]">
            <Card
                className="h-full w-full"
                shadow="md"
                border="1px"
                borderColor="gray.200"
            >
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
                                                <FormLabel>
                                                    Email
                                                </FormLabel>
                                                <Input
                                                    {...field}
                                                    type="email"
                                                    id="email"
                                                    placeholder="Email"
                                                    required
                                                />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="password">
                                        {({ field, form }) => (
                                            <FormControl>
                                                <FormLabel>
                                                    Password
                                                </FormLabel>
                                                <Input
                                                    type="password"
                                                    id="password"
                                                    placeholder="Password"
                                                    {...field}
                                                    required
                                                />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Text>
                                        Don&apos;t have an
                                        account?{' '}
                                        <NavLink
                                            to="/auth/signup"
                                            className="font-semibold text-teal-600 underline hover:no-underline"
                                        >
                                            Sign Up
                                        </NavLink>
                                    </Text>
                                    <Button
                                        className="w-full"
                                        colorScheme="teal"
                                        type="submit"
                                        isLoading={
                                            props.isSubmitting
                                        }
                                    >
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
